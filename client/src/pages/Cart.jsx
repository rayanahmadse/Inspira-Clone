import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2>Your cart is empty</h2>
        <Link to="/shop">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ marginBottom: "30px" }}>Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            padding: "15px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px" }}
          />

          <div style={{ flex: 1 }}>
            <h3 style={{ margin: "0 0 5px" }}>{item.name}</h3>
            <p style={{ margin: 0, color: "#777" }}>${item.price.toFixed(2)}</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          </div>

          <p style={{ width: "80px", textAlign: "right", fontWeight: "bold" }}>
            ${(item.price * item.quantity).toFixed(2)}
          </p>

          <button
            onClick={() => removeFromCart(item.id)}
            style={{
              background: "none",
              border: "none",
              color: "#e74c3c",
              cursor: "pointer",
              fontSize: "18px",
            }}
            title="Remove"
          >
            ✕
          </button>
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "30px" }}>
        <div style={{ textAlign: "right" }}>
          <h2>Total: ${cartTotal.toFixed(2)}</h2>
          <button
            onClick={() => navigate("/checkout")}
            style={{
              padding: "12px 30px",
              background: "#222",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}