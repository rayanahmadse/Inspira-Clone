import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/shop.css";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="shop-page wishlist-empty">
        <h2>Your wishlist is empty</h2>
        <Link to="/shop">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <div className="page-heading">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / Wishlist
        </div>
        <h1>Your Wishlist</h1>
      </div>

      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <div key={item.id} className="wishlist-card">
            <div className="wishlist-card-image">
              <img src={item.image} alt={item.name} />
            </div>
            <h3>{item.name}</h3>
            <p className="wishlist-card-price">${item.price.toFixed(2)}</p>

            <div className="wishlist-card-actions">
              <button className="btn btn-dark btn-small" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
              <button className="btn btn-outline btn-small" onClick={() => toggleWishlist(item)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}