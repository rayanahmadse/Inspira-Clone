import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products } from "../data";
import { useCart } from "../context/CartContext";
import "../styles/shop.css";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="shop-page cart-empty">
        <h2>Product not found</h2>
        <Link to="/shop">Back to Shop</Link>
      </div>
    );
  }

  function handleAddToCart() {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

   return (
    <div className="shop-page">
      <div className="page-heading">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.category}
        </div>
        <h1>Product Details</h1>
      </div>
      <div className="product-detail-grid">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          {product.badge && (
            <span className={`badge ${product.badge === "SALE" ? "badge-sale" : "badge-new"}`}>
              {product.badge}
            </span>
          )}

          <h1 className="product-title">{product.name}</h1>
          <p className="product-category">{product.category}</p>

          {product.rating && (
            <div className="product-rating">
              {"★".repeat(product.rating)}
              {"☆".repeat(5 - product.rating)}
            </div>
          )}

          <div>
            <span className="product-price">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="product-old-price">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          <p className={`product-stock ${product.stock > 0 ? "stock-in" : "stock-out"}`}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
          </p>

          <div className="quantity-selector">
            <button className="btn-round" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button className="btn-round" onClick={() => setQuantity((q) => q + 1)}>+</button>
          </div>

          <div className="action-buttons">
            <button className="btn btn-dark" onClick={handleAddToCart} disabled={product.stock === 0}>
              {added ? "Added!" : "Add to Cart"}
            </button>
            <button
              className={`btn btn-outline btn-wishlist ${isInWishlist(product.id) ? "active" : ""}`}
              onClick={() => toggleWishlist(product)}
            >
              {isInWishlist(product.id) ? "♥ Wishlisted" : "♡ Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}