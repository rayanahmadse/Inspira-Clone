import { Link } from "react-router-dom";
import "../styles/CategoryBanners.css";

export default function CategoryBanners() {
  return (
    <section className="inspira-cat-section">
      <div className="inspira-cat-grid">

        {/* Left: tall portrait of woman with bag */}
        <Link to="/shop" className="inspira-cat-tall">
          <img src="/assets/banner-womens.webp" alt="Women Fashion" />
        </Link>

        {/* Right column */}
        <div className="inspira-cat-right">

          {/* Top row: Women's Styles + New Shoes */}
          <div className="inspira-cat-row">
            <Link to="/shop" className="inspira-cat-item">
              <img src="/assets/banner_women.webp" alt="Women's Styles" />
            </Link>
            <Link to="/shop?category=shoes" className="inspira-cat-item">
              <img src="/assets/banner-shoes.jpg" alt="New Shoes" />
            </Link>
          </div>

          {/* Bottom: Men's Accessories — spans the full right width */}
          <Link to="/shop?category=accessories" className="inspira-cat-full">
            <img src="/assets/banner-mens.webp" alt="Men's Accessories" />
          </Link>

        </div>
      </div>
    </section>
  );
}
