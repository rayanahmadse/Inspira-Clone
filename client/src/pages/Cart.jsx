import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/shop.css";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="shop-page cart-empty">
        <h2>Your cart is empty</h2>
        <Link to="/shop">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <div className="page-heading">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / Cart
        </div>
        <h1>Your Cart</h1>
      </div>

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />

          <div className="cart-item-info">
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
          </div>

          <div className="cart-item-qty">
            <button className="btn-round" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button className="btn-round" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          </div>

          <p className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</p>

          <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)} title="Remove">
            ✕
          </button>
        </div>
      ))}

      <div className="cart-summary">
        <div className="cart-summary-box">
          <h2>Total: ${cartTotal.toFixed(2)}</h2>
          <button className="btn btn-dark" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}