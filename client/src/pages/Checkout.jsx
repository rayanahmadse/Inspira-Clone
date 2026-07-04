import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    payment: "cod",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  }

  if (orderPlaced) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h1>✅ Order Placed!</h1>
        <p>Thank you, {form.name}. Your order will be shipped to {form.address}, {form.city}.</p>
        <button
          onClick={() => navigate("/shop")}
          style={{
            marginTop: "20px",
            padding: "12px 30px",
            background: "#222",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/shop")}>Go to Shop</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px", display: "flex", gap: "40px", flexWrap: "wrap" }}>
      <form onSubmit={handleSubmit} style={{ flex: "1 1 400px" }}>
        <h1 style={{ marginBottom: "20px" }}>Checkout</h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={handleChange}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            required
            value={form.address}
            onChange={handleChange}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            required
            value={form.city}
            onChange={handleChange}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={form.phone}
            onChange={handleChange}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
          />

          <label style={{ marginTop: "10px" }}>Payment Method</label>
          <select
            name="payment"
            value={form.payment}
            onChange={handleChange}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
          >
            <option value="cod">Cash on Delivery</option>
            <option value="card">Credit/Debit Card</option>
          </select>

          {form.payment === "card" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "5px", padding: "15px", background: "#f5f5f5", borderRadius: "6px" }}>
              <input
                type="text"
                name="cardName"
                placeholder="Name on Card"
                required
                value={form.cardName || ""}
                onChange={handleChange}
                style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
              />
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                required
                maxLength={19}
                value={form.cardNumber || ""}
                onChange={handleChange}
                style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
              />
              <div style={{ display: "flex", gap: "12px" }}>
                <input
                  type="text"
                  name="cardExpiry"
                  placeholder="MM/YY"
                  required
                  maxLength={5}
                  value={form.cardExpiry || ""}
                  onChange={handleChange}
                  style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px", flex: 1 }}
                />
                <input
                  type="text"
                  name="cardCvv"
                  placeholder="CVV"
                  required
                  maxLength={4}
                  value={form.cardCvv || ""}
                  onChange={handleChange}
                  style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px", flex: 1 }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            style={{
              marginTop: "20px",
              padding: "14px",
              background: "#222",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Place Order
          </button>
        </div>
      </form>

      <div style={{ flex: "1 1 300px", background: "#f9f9f9", padding: "20px", borderRadius: "8px", height: "fit-content" }}>
        <h2 style={{ marginBottom: "15px" }}>Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <hr style={{ margin: "15px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "18px" }}>
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}