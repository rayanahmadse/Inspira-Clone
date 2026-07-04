import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products } from "../data";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
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
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 350px" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>

        <div style={{ flex: "1 1 350px" }}>
          {product.badge && (
            <span
              style={{
                background: product.badge === "SALE" ? "#e74c3c" : "#2ecc71",
                color: "white",
                padding: "4px 10px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              {product.badge}
            </span>
          )}

<h1 style={{ margin: "15px 0 5px", fontSize: "28px", lineHeight: "1.3" }}>{product.name}</h1>          <p style={{ color: "#777" }}>{product.category}</p>

          {product.rating && (
            <div style={{ margin: "10px 0" }}>
              {"★".repeat(product.rating)}
              {"☆".repeat(5 - product.rating)}
            </div>
          )}

          <div style={{ margin: "15px 0" }}>
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#999",
                  marginLeft: "10px",
                }}
              >
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p style={{ lineHeight: "1.6", color: "#555" }}>
            {product.description}
          </p>

          <p style={{ fontSize: "14px", color: product.stock > 0 ? "green" : "red" }}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "20px 0" }}>
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              style={{
                padding: "12px 24px",
                background: "#222",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {added ? "Added!" : "Add to Cart"}
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              style={{
                padding: "12px 24px",
                background: isInWishlist(product.id) ? "#e74c3c" : "white",
                color: isInWishlist(product.id) ? "white" : "#222",
                border: "1px solid #222",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {isInWishlist(product.id) ? "♥ Wishlisted" : "♡ Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}