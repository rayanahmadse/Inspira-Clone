import { useState } from 'react';

const recentPosts = ['Creative', 'Fashion', 'Image', 'Photography', 'Travel', 'Videos', 'WordPress'];
const archives = ['March 2021', 'December 2021', 'November 2021', 'September 2021', 'August 2021'];
const tags = ['desgin', 'fashion', 'jams', 'journal', 'personal', 'Photography'];

export default function BlogSidebar() {
  const [query, setQuery] = useState('');

  return (
    <aside className="blog-sidebar">
      <div className="sidebar-block">
        <h4>SEARCH</h4>
        <form className="sidebar-search" onSubmit={(e) => e.preventDefault()}>
          <input placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="sidebar-block">
        <h4>RECENT POST</h4>
        <ul>
          {recentPosts.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </div>

      <div className="sidebar-block">
        <h4>ARCHIVES</h4>
        <ul>
          {archives.map((a) => <li key={a}>{a}</li>)}
        </ul>
      </div>

      <div className="sidebar-block">
        <h4>TAGS</h4>
        <div className="tag-list">
          {tags.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
      </div>
    </aside>
  );
}
