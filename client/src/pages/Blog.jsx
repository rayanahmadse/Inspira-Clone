import { Link } from 'react-router-dom';
import BlogSidebar from './BlogSidebar';
import * as siteData from '../data.js';
import '../styles/Blog.css';

// Expected shape from data.js: export const blogPosts = [{ id, title, image, views, excerpt }, ...]
// Falls back to sample data below if data.js doesn't export blogPosts yet.
const blogPosts = siteData.blogPosts;

const fallbackPosts = [
  { id: 1, title: 'Qui Nunc Nobis Videntur Parum', image: '/assets/blog/blog1.jpg', views: 15, excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy...' },
  { id: 2, title: 'Qui Nunc Nobis Videntur Parum', image: '/assets/blog/blog2.jpg', views: 15, excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy...' },
  { id: 3, title: 'Qui Nunc Nobis Videntur Parum', image: '/assets/blog/blog3.jpg', views: 15, excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy...' },
  { id: 4, title: 'Qui Nunc Nobis Videntur Parum', image: '/assets/blog/blog4.jpg', views: 15, excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy...' },
  { id: 5, title: 'Qui Nunc Nobis Videntur Parum', image: '/assets/blog/blog5.jpg', views: 15, excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy...' },
];

export default function Blog() {
  const posts = blogPosts && blogPosts.length ? blogPosts : fallbackPosts;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Blog Left Sidebar</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>&gt;</span> <span>Blog Left Sidebar</span>
          </div>
        </div>
      </div>

      <div className="blog-page container">
        <BlogSidebar />

        <div className="blog-list">
          {posts.map((post) => (
            <article className="blog-card" key={post.id}>
              <Link to={`/blog/${post.id}`}>
                <img src={post.image} alt={post.title} />
              </Link>
              <h3><Link to={`/blog/${post.id}`}>{post.title}</Link></h3>
              <p className="blog-meta">{post.views} MEMBERS VIEWED THIS POST</p>
              <p className="blog-excerpt">{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className="read-more">READ MORE</Link>
            </article>
          ))}

          <div className="pagination">
            <button className="active">1</button>
            <button>2</button>
            <button>&gt;</button>
          </div>
        </div>
      </div>
    </>
  );
}
