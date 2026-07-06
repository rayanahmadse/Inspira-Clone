import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/NotFound.css';

export default function NotFound() {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // wire to real search/shop route later
    console.log('search:', query);
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Error 404</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>&gt;</span> <span>Error 404</span>
          </div>
        </div>
      </div>

      <div className="notfound-page container">
        <h2 className="notfound-code">404</h2>
        <h3 className="notfound-title">OPPS! PAGE NOT BE FOUND</h3>
        <p className="notfound-text">
          Sorry but the page you are looking for does not exist, have been removed,
          name changed or is temporarily unavailable.
        </p>

        <form className="notfound-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" aria-label="Search">🔍</button>
        </form>

        <Link to="/" className="btn-back-home">BACK TO HOME PAGE</Link>
      </div>
    </>
  );
}
