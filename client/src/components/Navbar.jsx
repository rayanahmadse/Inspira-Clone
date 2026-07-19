import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import SearchOverlay from "./SearchOverlay";
import "../styles/Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart, wishlist } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="logo">
            <img src="/assets/inspira-logo.webp" alt="Inspira" className="logo-img" />
          </Link>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <NavLink to="/" end className={({ isActive }) => isActive ? "nav-active" : ""}>HOME</NavLink>
            <NavLink to="/shop" className={({ isActive }) => isActive ? "nav-active" : ""}>SHOP</NavLink>
            <NavLink to="/blog" className={({ isActive }) => isActive ? "nav-active" : ""}>BLOG</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-active" : ""}>ABOUT</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-active" : ""}>CONTACT</NavLink>
          </nav>

          <div className="nav-icons">
            {/* Search */}
            <button
              className="icon-btn"
              aria-label="search"
              onClick={() => setSearchOpen(true)}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>

            {/* Cart with badge */}
            <Link to="/cart" className="icon-btn cart-wrap" aria-label="cart">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            {/* Wishlist with badge */}
            <Link to="/wishlist" className="icon-btn cart-wrap" aria-label="wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
              {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
            </Link>

            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          </div>
        </div>
      </header>

      {/* Search overlay — rendered outside the header so it covers everything */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}