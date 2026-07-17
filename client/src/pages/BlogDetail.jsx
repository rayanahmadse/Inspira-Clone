import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import BlogSidebar from './BlogSidebar';
import * as siteData from '../data.js';
import '../styles/Blog.css';

const blogPosts = siteData.blogPosts;

const fallbackPost = {
  id: 1,
  title: 'Blog Image Post',
  image: '/src/assets/blog-1.jpg',
  author: 'admin',
  date: 'Mar 10 2021',
  tags: ['fashion', 't-shirt', 'white'],
  paragraphs: [
    'Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex. Aenean posuere libero eu augue condimentum rhoncus. Praesente ornare tortor ac ante egestas hendrerit. Aliquam et metus pharetra, bibendum massa nec, fermentum odio. Nunc id leo ultrices, mollis ligula in, finibus tortor.',
    'Quisque semper nunc vitae erat pellentesque, ac placerat arcu consectetur. In venenatis elit ac ultrices convallis. Duis est nisi, tincidunt ac urna sed, cursus blandit lectus.',
    'Aenean et tempor eros, vitae sollicitudin velit. Etiam varius enim quam tempor, sed efficitur ex ultrices. Phasellus posuere est vel dui vestibulum condimentum.',
    'Suspendisse turpis ipsum, tempus in nulla eu, posuere pharetra nibh. In dignissim vitae lorem non mollis. Praesent pretium tellus in tortor viverra condimentum.',
  ],
};

const initialComments = [
  { id: 1, author: 'admin', date: 'October 6, 2021 at 1:38 am', text: 'just a nice post' },
  { id: 2, author: 'demo', date: 'October 6, 2021 at 3:25 pm', text: 'Quisque semper nunc vitae erat pellentesque, ac placerat arcu consectetur' },
  { id: 3, author: 'admin', date: 'October 6, 2021 at 2:18 pm', text: 'Quisque orci nibh, porta vitae sagittis sit amet, vehicula vel mauris. Aenean at justo dolor.' },
];

export default function BlogDetail() {
  const { id } = useParams();
  const post =
    (blogPosts && blogPosts.find((p) => String(p.id) === id)) || fallbackPost;

  const [comments, setComments] = useState(initialComments);
  const [form, setForm] = useState({ comment: '', name: '', website: '', email: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.comment.trim()) return;
    setComments([
      ...comments,
      { id: Date.now(), author: form.name || 'Guest', date: 'just now', text: form.comment },
    ]);
    setForm({ comment: '', name: '', website: '', email: '' });
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Blog Details</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>&gt;</span> <span>Blog Details</span>
          </div>
        </div>
      </div>

      <div className="blog-page container">
        <BlogSidebar />

        <div className="blog-detail">
          <img src={post.image} alt={post.title} className="detail-hero" />
          <h2>{post.title.toUpperCase()}</h2>
          <p className="detail-meta">POSTS BY : {post.author || 'admin'} / {post.date || ''}</p>

          {(post.paragraphs || fallbackPost.paragraphs).map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <div className="detail-footer-row">
            {comments.length} comments / Tags: {(post.tags || fallbackPost.tags).join(', ')}
          </div>

          <h3 className="comments-title">{comments.length} COMMENTS</h3>
          <div className="comments-list">
            {comments.map((c) => (
              <div className="comment" key={c.id}>
                <span className="comment-author">{c.author}</span>
                <span className="comment-date"> {c.date}</span>
                <p>{c.text}</p>
              </div>
            ))}
          </div>

          <h3 className="comments-title">LEAVE A REPLY</h3>
          <p className="required-note">Your email address will not be published. Required fields are marked *</p>
          <form onSubmit={handleSubmit} className="comment-form">
            <label>Comment</label>
            <textarea name="comment" rows="6" value={form.comment} onChange={handleChange} />
            <div className="form-row">
              <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
              <input name="website" placeholder="Website" value={form.website} onChange={handleChange} />
              <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            </div>
            <button type="submit" className="btn-outline">POST COMMENT</button>
          </form>
        </div>
      </div>
    </>
  );
}
