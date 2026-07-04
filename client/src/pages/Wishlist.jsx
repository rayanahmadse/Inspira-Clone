import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2>Your wishlist is empty</h2>
        <Link to="/shop">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ marginBottom: "30px" }}>Your Wishlist</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
        {wishlist.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "center",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "6px" }}
            />
            <h3 style={{ margin: "10px 0 5px" }}>{item.name}</h3>
            <p style={{ margin: "0 0 10px", color: "#777" }}>${item.price.toFixed(2)}</p>

            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
              <button
                onClick={() => addToCart(item)}
                style={{
                  padding: "8px 14px",
                  background: "#222",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(item)}
                style={{
                  padding: "8px 14px",
                  background: "white",
                  color: "#e74c3c",
                  border: "1px solid #e74c3c",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}