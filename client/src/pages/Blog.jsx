import { Link } from 'react-router-dom'
import * as data from '../data.js'
import '../styles/theme.css'
import '../styles/Blog.css'

// NOTE: This expects a `blogs` array in data.js with objects shaped like:
// { id: 1, title: '', excerpt: '', image: '', date: '', author: '', content: '' }
// Confirm this shape with Rayan before relying on it.
// Using namespace import + fallback so the app doesn't crash if `blogs`
// isn't added to data.js yet.
const blogs = data.blogs || []

export default function BlogList() {
  return (
    <div className="blog-page">
      <div className="blog-hero">
        <h1 className="section-title">Latest Blogs &amp; Updates</h1>
        <p className="section-subtitle">Trending &amp; stunning, unique.</p>
      </div>

      <div className="blog-grid">
        {blogs && blogs.length > 0 ? (
          blogs.map((post) => (
            <div className="blog-card" key={post.id}>
              <Link to={`/blog/${post.id}`} className="blog-card-img">
                <img src={post.image} alt={post.title} />
              </Link>
              <div className="blog-card-body">
                <span className="blog-date">📅 {post.date}</span>
                <h3>
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="link-accent">
                  Continue Reading
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="blog-empty">No blog posts yet.</p>
        )}
      </div>
    </div>
  )
}
