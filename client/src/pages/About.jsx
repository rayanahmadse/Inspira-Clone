import '../styles/theme.css'
import '../styles/AboutUs.css'

export default function AboutUs() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About Inspira</h1>
        <p>Fashion that fits your story.</p>
      </section>

      <section className="about-content">
        <div className="about-block">
          <h2>Our Story</h2>
          <p>
            Inspira started with a simple idea: fashion should feel personal,
            not mass-produced. Every piece in our collection is chosen to
            help you express who you are, without compromising on comfort
            or quality.
          </p>
        </div>

        <div className="about-block">
          <h2>Our Mission</h2>
          <p>
            We believe great style shouldn't be complicated or expensive.
            Our mission is to bring thoughtfully designed, everyday fashion
            to people who want to look good and feel good doing it.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <h3>Quality First</h3>
            <p>Every product is checked for fabric, fit, and finish before it reaches you.</p>
          </div>
          <div className="about-card">
            <h3>Fast Shipping</h3>
            <p>We get your order out the door quickly, and keep you updated the whole way.</p>
          </div>
          <div className="about-card">
            <h3>Easy Returns</h3>
            <p>Not the right fit? Our return process is simple and hassle-free.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
