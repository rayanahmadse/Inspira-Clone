import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const [shopOpen, setShopOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">Inspira</Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>

          <div
            className="dropdown"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <span>Shop ▾</span>
            {shopOpen && (
              <div className="dropdown-menu">
                <Link to="/shop">Shop Grid</Link>
                <Link to="/product/1">Product Detail</Link>
              </div>
            )}
          </div>

          <div
            className="dropdown"
            onMouseEnter={() => setBlogOpen(true)}
            onMouseLeave={() => setBlogOpen(false)}
          >
            <span>Blog ▾</span>
            {blogOpen && (
              <div className="dropdown-menu">
                <Link to="/blog">Blog List</Link>
              </div>
            )}
          </div>

          <div
            className="dropdown"
            onMouseEnter={() => setPagesOpen(true)}
            onMouseLeave={() => setPagesOpen(false)}
          >
            <span>Pages ▾</span>
            {pagesOpen && (
              <div className="dropdown-menu">
                <Link to="/about">About Us</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/checkout">Checkout</Link>
                <Link to="/wishlist">Wishlist</Link>
                <Link to="/login">Login / Register</Link>
              </div>
            )}
          </div>

          <Link to="/contact">Contact</Link>
        </nav>

        <div className="nav-icons">
          <button aria-label="search">🔍</button>
          <Link to="/cart" aria-label="cart">🛍️ <span className="badge">0</span></Link>
          <Link to="/login" aria-label="account">⚙️</Link>
        </div>
      </div>
    </header>
  );
}