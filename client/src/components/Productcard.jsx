import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

function Stars({ rating }) {
  return (
    <div className="inspira-product-rating">
      {[1,2,3,4,5].map(n => (
        <span key={n} className={n <= rating ? "inspira-star-filled" : "inspira-star-empty"}>★</span>
      ))}
    </div>
  );
}

export default function ProductCard({ product }) {
  const { name, price, oldPrice, rating, image, badge, discountPercent } = product;
  const { addToCart } = useCart();

  return (
    <div className="inspira-product-card">
      {badge && (
        <span className={`inspira-product-badge ${badge === "SALE" ? "inspira-badge-sale" : "inspira-badge-new"}`}>
          {badge === "SALE" && discountPercent ? `-${discountPercent}%` : badge}
        </span>
      )}
      <a href="#" className="inspira-product-img-wrap">
        <img src={image} alt={name} />
      </a>
      <div className="inspira-product-info">
        <h4>{name}</h4>
        <Stars rating={rating} />
        <div className="inspira-product-price">
          <span className="inspira-price">${price.toFixed(2)}</span>
          {oldPrice && <span className="inspira-old-price">${oldPrice.toFixed(2)}</span>}
        </div>
        <button className="inspira-btn-cart" onClick={() => addToCart(product)}>Add To Cart</button>
      </div>
    </div>
  );
}
