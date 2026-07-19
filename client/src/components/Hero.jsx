import "../styles/Hero.css";

export default function Hero() {
  return (
    <section className="inspira-hero">
      <div className="inspira-hero-content">
        <p className="inspira-hero-kicker">WE MAKE IT EASY TO EXPRIENCE CREATIVITY</p>
        <h1 className="inspira-hero-title">
          Stylish new<br />design
        </h1>
        <p className="inspira-hero-sub">
          Welcome to the home of women&apos;s fashion clothing &amp; accessories at Italy
        </p>
        <div className="inspira-hero-actions">
          <div className="inspira-hero-dots">
            <span className="inspira-dot"></span>
            <span className="inspira-dot inspira-active"></span>
          </div>
          <a href="/shop" className="inspira-hero-btn">SHOP NOW</a>
        </div>
      </div>
    </section>
  );
}
