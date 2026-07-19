import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products } from "../data";
import "../styles/SearchOverlay.css";

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const trimmed = query.trim().toLowerCase();

  const results = trimmed.length >= 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(trimmed) ||
        (p.category && p.category.toLowerCase().includes(trimmed)) ||
        (p.description && p.description.toLowerCase().includes(trimmed))
      ).slice(0, 8)
    : [];

  const handleResultClick = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      handleResultClick(results[0].id);
    }
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-box" onClick={(e) => e.stopPropagation()}>
        <form className="search-form" onSubmit={handleSubmit}>
          <svg className="search-icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
          <button type="button" className="search-close-btn" onClick={onClose} aria-label="Close search">
            ✕
          </button>
        </form>

        {/* Results */}
        {trimmed.length >= 1 && (
          <div className="search-results">
            {results.length === 0 ? (
              <div className="search-no-results">
                No products found for "<strong>{query}</strong>"
              </div>
            ) : (
              <>
                <div className="search-results-header">
                  {results.length} result{results.length !== 1 ? "s" : ""} for "<strong>{query}</strong>"
                </div>
                <ul className="search-results-list">
                  {results.map((p) => (
                    <li key={p.id}>
                      <button className="search-result-item" onClick={() => handleResultClick(p.id)}>
                        <div className="search-result-img">
                          <img src={p.image} alt={p.name} />
                        </div>
                        <div className="search-result-info">
                          <span className="search-result-name">{p.name}</span>
                          <span className="search-result-category">{p.category}</span>
                          <span className="search-result-price">
                            {p.oldPrice && <s>${p.oldPrice.toFixed(2)}</s>}
                            ${p.price.toFixed(2)}
                          </span>
                        </div>
                        {p.badge && (
                          <span className={`search-result-badge ${p.badge === "SALE" ? "sale" : "new"}`}>
                            {p.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="search-results-footer">
                  <Link
                    to={`/shop?search=${encodeURIComponent(trimmed)}`}
                    className="search-view-all"
                    onClick={onClose}
                  >
                    View all {results.length} results in Shop →
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
