import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function parseJsonBody(req) {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }
  const raw = Buffer.concat(chunks).toString('utf8')
  return JSON.parse(raw)
}

function sendJson(res, payload, status = 200) {
  const body = JSON.stringify(payload)
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  })
  res.end(body)
}

function serializeProducts(products) {
  const lines = products.map((product) => {
    const entries = []
    entries.push(`    {`)
    entries.push(`        id: ${product.id},`)
    entries.push(`        name: ${JSON.stringify(product.name)},`)
    entries.push(`        category: ${JSON.stringify(product.category)},`)
    entries.push(`        price: ${product.price},`)
    entries.push(`        oldPrice: ${product.oldPrice === '' || product.oldPrice === null ? null : product.oldPrice},`)
    entries.push(`        rating: null,`)
    entries.push(`        image: ${JSON.stringify(product.image)},`)
    entries.push(`        badge: ${JSON.stringify(product.badge)},`)
    entries.push(`        description: ${JSON.stringify(product.description)},`)
    entries.push(`        stock: ${product.stock},`)
    entries.push(`        isFeatured: false,`)
    entries.push(`        isNewArrival: false,`)
    entries.push(`    },`)
    return entries.join('\n')
  })
  return `export const products = [\n${lines.join('\n')}\n];\n`
}

async function updateDataJs(products) {
  const dataPath = path.resolve(__dirname, '../client/src/data.js')
  const original = await fs.readFile(dataPath, 'utf8')
  const replacement = serializeProducts(products)
  const next = original.replace(/export const products = \[[\s\S]*?\];/m, replacement)
  if (next === original) {
    throw new Error('Could not find products export block in data.js')
  }
  await fs.writeFile(dataPath, next, 'utf8')
}

function ensureAssetDir() {
  return path.resolve(__dirname, 'public', 'assets', 'products')
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'admin-api-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url?.startsWith('/api/')) {
            return next()
          }

          try {
            if (req.method === 'POST' && req.url === '/api/upload-image') {
              const body = await parseJsonBody(req)
              const filename = path.basename(body.filename || 'upload.png')
              const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '-')
              const uniqueName = `${Date.now()}-${safeName}`
              const destDir = ensureAssetDir()
              await fs.mkdir(destDir, { recursive: true })

              const [, base64Data] = body.dataUrl.split(',')
              if (!base64Data) {
                return sendJson(res, { error: 'Invalid image payload' }, 400)
              }

              const buffer = Buffer.from(base64Data, 'base64')
              const outputPath = path.join(destDir, uniqueName)
              await fs.writeFile(outputPath, buffer)

              return sendJson(res, { path: `/assets/products/${uniqueName}` })
            }

            if (req.method === 'POST' && req.url === '/api/save-products') {
              const body = await parseJsonBody(req)
              if (!Array.isArray(body.products)) {
                return sendJson(res, { error: 'Missing products payload' }, 400)
              }
              await updateDataJs(body.products)
              return sendJson(res, { success: true })
            }

            return sendJson(res, { error: 'Unknown API endpoint' }, 404)
          } catch (error) {
            console.error(error)
            return sendJson(res, { error: error.message || 'Server error' }, 500)
          }
        })
      },
    },
  ],
})
