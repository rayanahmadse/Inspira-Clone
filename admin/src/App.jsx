import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter as Router, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { customers as initialCustomers, orders as initialOrders, products as initialProducts } from '../../client/src/data.js'
import './index.css'

const emptyProduct = {
  id: null,
  name: '',
  category: 'Bags',
  price: 0,
  oldPrice: '',
  stock: 0,
  badge: 'NEW',
  image: '',
  description: '',
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/products', label: 'Products' },
  { path: '/orders', label: 'Orders' },
  { path: '/customers', label: 'Customers' },
]

function formatCurrency(value) {
  return `USD ${value.toFixed(2)}`
}

function StatusPill({ status }) {
  const colorClass = {
    Delivered: 'pill-delivered',
    Pending: 'pill-pending',
    Shipped: 'pill-shipped',
  }[status] || 'pill-neutral'

  return <span className={`status-pill ${colorClass}`}>{status}</span>
}

function ImagePreview({ src, alt }) {
  const [error, setError] = useState(false)

  if (!src || error) {
    return <div className="image-fallback">No image</div>
  }

  return <img className="product-thumb" src={src} alt={alt} onError={() => setError(true)} />
}

function Dashboard({ stats, products, orders, customers }) {
  return (
    <>
      <div className="section-head">
        <div>
          <p className="eyebrow">Management overview</p>
          <h1>Admin dashboard</h1>
          <p className="section-copy">Track products, orders, and customers from a single modern admin experience.</p>
        </div>
      </div>

      <div className="stat-grid">
        <article className="stat-card accent-card">
          <span>Total products</span>
          <strong>{stats.productCount}</strong>
          <p>{stats.lowStock} items low in stock</p>
        </article>
        <article className="stat-card">
          <span>Orders</span>
          <strong>{stats.orderCount}</strong>
          <p>{stats.pendingOrders} pending approval</p>
        </article>
        <article className="stat-card">
          <span>Customers</span>
          <strong>{stats.customerCount}</strong>
          <p>{customers.length} active accounts</p>
        </article>
        <article className="stat-card">
          <span>Projected revenue</span>
          <strong>{formatCurrency(stats.revenue)}</strong>
          <p>{orders.length} orders recorded</p>
        </article>
      </div>

      <div className="overview-grid">
        <section className="overview-card">
          <div className="card-header">
            <div>
              <h2>Recent orders</h2>
              <p>Latest order activity and status updates.</p>
            </div>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{formatCurrency(order.total)}</td>
                    <td><StatusPill status={order.status} /></td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="overview-card compact-card">
          <div className="card-header">
            <div>
              <h2>Top categories</h2>
              <p>Product distribution across the catalog.</p>
            </div>
          </div>
          <ul className="category-list">
            {Object.entries(stats.categoryCounts).map(([category, count]) => (
              <li key={category}>
                <span>{category}</span>
                <strong>{count}</strong>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}

function Products({ products, onEdit, onDelete, onAdd }) {
  return (
    <>
      <div className="section-head table-head">
        <div>
          <p className="eyebrow">Catalog management</p>
          <h1>Products</h1>
          <p className="section-copy">Manage inventory, update pricing, and keep stock counts accurate.</p>
        </div>
        <button className="button button-primary" onClick={onAdd}>Add product</button>
      </div>

      <div className="card-table">
        <div className="table-scroll">
          {products.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Badge</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>#{product.id}</td>
                    <td><ImagePreview src={product.image} alt={product.name} /></td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.oldPrice ? <span className="strike">{formatCurrency(product.oldPrice)}</span> : null} {formatCurrency(product.price)}</td>
                    <td>{product.stock}</td>
                    <td><span className="badge">{product.badge}</span></td>
                    <td>
                      <div className="table-actions">
                        <button className="button button-secondary button-small" onClick={() => onEdit(product)}>Edit</button>
                        <button className="button button-ghost button-small" onClick={() => onDelete(product.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">No products found. Use the button above to add a new product.</div>
          )}
        </div>
      </div>
    </>
  )
}

function Orders({ orders }) {
  return (
    <>
      <div className="section-head">
        <div>
          <p className="eyebrow">Order pipeline</p>
          <h1>Orders</h1>
          <p className="section-copy">Review order status, totals, and customer activity.</p>
        </div>
      </div>

      <div className="card-table">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.products.length}</td>
                  <td>{formatCurrency(order.total)}</td>
                  <td><StatusPill status={order.status} /></td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function Customers({ customers }) {
  return (
    <>
      <div className="section-head">
        <div>
          <p className="eyebrow">Client records</p>
          <h1>Customers</h1>
          <p className="section-copy">Keep customer contact details visible and up to date.</p>
        </div>
      </div>

      <div className="card-table">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>#{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function ProductModal({ form, setForm, onClose, onSave }) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    const parsedValue = ['price', 'oldPrice', 'stock'].includes(name) ? Number(value) : value
    setForm((current) => ({ ...current, [name]: parsedValue }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError('')
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const dataUrl = reader.result
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name, dataUrl }),
        })
        const result = await response.json()
        if (!response.ok) {
          throw new Error(result.error || 'Upload failed')
        }
        setForm((current) => ({ ...current, image: result.path }))
      } catch (error) {
        setUploadError(error.message)
      } finally {
        setUploading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2>{form.id ? 'Edit product' : 'Add product'}</h2>
          <button className="button button-icon" onClick={onClose} aria-label="Close modal">×</button>
        </div>
        <div className="modal-body">
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} placeholder="Product name" />
          </label>
          <label>
            Category
            <select name="category" value={form.category} onChange={handleChange}>
              <option>Bags</option>
              <option>Shoes</option>
              <option>Wallets</option>
              <option>Accessories</option>
            </select>
          </label>
          <div className="modal-grid">
            <label>
              Price
              <input name="price" type="number" min="0" value={form.price} onChange={handleChange} />
            </label>
            <label>
              Old price
              <input name="oldPrice" type="number" min="0" value={form.oldPrice || ''} onChange={handleChange} />
            </label>
          </div>
          <div className="modal-grid">
            <label>
              Stock
              <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} />
            </label>
            <label>
              Badge
              <select name="badge" value={form.badge} onChange={handleChange}>
                <option>NEW</option>
                <option>SALE</option>
                <option>HOT</option>
                <option>POPULAR</option>
              </select>
            </label>
          </div>
          <label>
            Description
            <textarea name="description" value={form.description} onChange={handleChange} rows="4" placeholder="Short product summary" />
          </label>
          <div className="modal-grid">
            <label>
              Upload image
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>
            <div className="image-preview-box">
              <p className="preview-label">Preview</p>
              <ImagePreview src={form.image} alt={form.name || 'New product'} />
            </div>
          </div>
          {uploading && <p className="upload-status">Uploading image...</p>}
          {uploadError && <p className="field-error">{uploadError}</p>}
        </div>
        <div className="modal-actions">
          <button className="button button-ghost" onClick={onClose}>Cancel</button>
          <button className="button button-primary" onClick={() => onSave(form)}>{form.id ? 'Save changes' : 'Create product'}</button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [orders] = useState(initialOrders)
  const [customers] = useState(initialCustomers)
  const [modalOpen, setModalOpen] = useState(false)
  const [formState, setFormState] = useState(emptyProduct)

  const stats = useMemo(() => {
    const categoryCounts = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1
      return acc
    }, {})

    return {
      productCount: products.length,
      orderCount: orders.length,
      customerCount: customers.length,
      revenue: orders.reduce((sum, order) => sum + order.total, 0),
      lowStock: products.filter((product) => product.stock <= 10).length,
      pendingOrders: orders.filter((order) => order.status === 'Pending').length,
      categoryCounts,
    }
  }, [products, orders, customers])

  const openNewProduct = () => {
    setFormState(emptyProduct)
    setModalOpen(true)
  }

  const openEditProduct = (product) => {
    setFormState(product)
    setModalOpen(true)
  }

  const handleDeleteProduct = (id) => {
    const confirmed = window.confirm('Delete this product from inventory?')
    if (confirmed) {
      const nextProducts = products.filter((product) => product.id !== id)
      setProducts(nextProducts)
      persistProducts(nextProducts)
    }
  }

  const persistProducts = async (nextProducts) => {
    try {
      const response = await fetch('/api/save-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: nextProducts }),
      })
      const result = await response.json()
      if (!response.ok) {
        console.error('Unable to persist products:', result.error || 'Unknown error')
      }
    } catch (error) {
      console.error('Unable to persist products:', error)
    }
  }

  const handleSaveProduct = (productData) => {
    if (!productData.name.trim()) {
      window.alert('Please enter a valid product name.')
      return
    }

    let nextProducts
    if (productData.id) {
      nextProducts = products.map((product) => (product.id === productData.id ? productData : product))
    } else {
      const nextId = Math.max(0, ...products.map((product) => product.id)) + 1
      nextProducts = [...products, { ...productData, id: nextId }]
    }

    setProducts(nextProducts)
    persistProducts(nextProducts)
    setModalOpen(false)
  }

  return (
    <Router>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand-block">
            <div className="brand-mark">IA</div>
            <div>
              <p className="brand-label">Inspira</p>
              <p className="brand-note">Admin panel</p>
            </div>
          </div>
          <nav className="nav-menu">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-footer">
            <p>Welcome back.</p>
            <p className="footer-note">Manage the app with clean, responsive controls.</p>
          </div>
        </aside>

        <main className="main-panel">
          <header className="topbar">
            <div>
              <p className="top-label">Live insight</p>
              <h2>Control center</h2>
            </div>
            <div className="top-actions">
              <button className="button button-secondary" type="button">Sync data</button>
            </div>
          </header>

          <div className="content-frame">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard stats={stats} products={products} orders={orders} customers={customers} />} />
              <Route path="/products" element={<Products products={products} onAdd={openNewProduct} onEdit={openEditProduct} onDelete={handleDeleteProduct} />} />
              <Route path="/orders" element={<Orders orders={orders} />} />
              <Route path="/customers" element={<Customers customers={customers} />} />
            </Routes>
          </div>
        </main>
      </div>

      {modalOpen && (
        <ProductModal form={formState} setForm={setFormState} onClose={() => setModalOpen(false)} onSave={handleSaveProduct} />
      )}
    </Router>
  )
}

export default App
