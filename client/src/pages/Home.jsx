import Hero from "../components/Hero";
import ServiceBar from "../components/ServiceBar";
import ProductCard from "../components/ProductCard";
import CategoryBanners from "../components/CategoryBanners";
import BlogCard from "../components/BlogCard";
import { products, blogPosts } from "../data";
import "../styles/Home.css";

export default function Home() {
  const featured = products.filter((p) => p.isFeatured);
  const newArrivals = products.filter((p) => p.isNewArrival);

  return (
    <>
      <Hero />
      <ServiceBar />

      {/* Featured Products */}
      <section className="inspira-section">
        <div className="inspira-section-title">
          <h2><span className="inspira-title-dash">—</span> Featured Products <span className="inspira-title-dash">—</span></h2>
          <p>Trending &amp; stunning. Unique.</p>
        </div>
        <div className="inspira-products-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <CategoryBanners />

      {/* New Arrivals */}
      <section className="inspira-section">
        <div className="inspira-section-title">
          <h2><span className="inspira-title-dash">—</span> New Arrivals <span className="inspira-title-dash">—</span></h2>
          <p>Trending &amp; stunning. Unique.</p>
        </div>
        <div className="inspira-products-grid">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="inspira-section">
        <div className="inspira-section-title">
          <h2><span className="inspira-title-dash">—</span> LATEST BLOGS &amp; UPDATES <span className="inspira-title-dash">—</span></h2>
        </div>
        <div className="inspira-blog-grid">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="inspira-newsletter">
        <h3>JOIN THE NEWSLETTER</h3>
        <p>Sign up for our newsletter !</p>
        <div className="inspira-newsletter-form">
          <input type="email" placeholder="Enter your e-mail" />
          <button>SUBSCRIBE</button>
        </div>
      </section>
    </>
  );
}
