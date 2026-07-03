import { useParams, Link } from 'react-router-dom'
import * as data from '../data.js'
import '../styles/theme.css'
import '../styles/Blog.css'

// Using namespace import + fallback so the app doesn't crash if `blogs`
// isn't added to data.js yet. See BlogList.jsx for the expected shape.
const blogs = data.blogs || []

export default function BlogSingle() {
  const { id } = useParams()
  const post = blogs?.find((p) => String(p.id) === id)

  if (!post) {
    return (
      <div className="blog-single-empty">
        <h2>Post not found</h2>
        <Link to="/blog">Back to Blog</Link>
      </div>
    )
  }

  return (
    <div className="blog-single">
      <div className="blog-single-img">
        <img src={post.image} alt={post.title} />
      </div>

      <div className="blog-single-content">
        <span className="blog-date">{post.date} • {post.author}</span>
        <h1>{post.title}</h1>
        <p>{post.content}</p>

        <Link to="/blog" className="blog-back link-accent">← Back to Blog</Link>
      </div>
    </div>
  )
}
