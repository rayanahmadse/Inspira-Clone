import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/shop.css";

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
      <div className="shop-page order-confirmation">
        <h1>✅ Order Placed!</h1>
        <p>Thank you, {form.name}. Your order will be shipped to {form.address}, {form.city}.</p>
        <button className="btn btn-dark" onClick={() => navigate("/shop")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="shop-page checkout-empty">
        <h2>Your cart is empty</h2>
        <button className="btn btn-dark" onClick={() => navigate("/shop")}>Go to Shop</button>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <div className="page-heading">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/cart">Cart</Link> / Checkout
        </div>
        <h1>Checkout</h1>
      </div>

      <div className="checkout-grid">
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-fields">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              required
              value={form.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              required
              value={form.city}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              value={form.phone}
              onChange={handleChange}
            />

            <label>Payment Method</label>
            <select name="payment" value={form.payment} onChange={handleChange}>
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
            </select>

            {form.payment === "card" && (
              <div className="card-fields">
                <input
                  type="text"
                  name="cardName"
                  placeholder="Name on Card"
                  required
                  value={form.cardName || ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  required
                  maxLength={19}
                  value={form.cardNumber || ""}
                  onChange={handleChange}
                />
                <div className="card-fields-row">
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    required
                    maxLength={5}
                    value={form.cardExpiry || ""}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="cardCvv"
                    placeholder="CVV"
                    required
                    maxLength={4}
                    value={form.cardCvv || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-dark" style={{ marginTop: "10px" }}>
              Place Order
            </button>
          </div>
        </form>

        <div className="order-summary">
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="order-summary-row">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="order-summary-total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}