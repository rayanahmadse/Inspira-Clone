import { useState } from 'react'
import '../styles/theme.css'
import '../styles/Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // No backend — just simulate sending
    console.log('Contact form submitted:', form)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you.</p>
      </div>

      <div className="contact-wrap">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p><strong>Address:</strong> 123 Fashion Street, Lahore, Pakistan</p>
          <p><strong>Email:</strong> support@inspira.com</p>
          <p><strong>Phone:</strong> +92 300 1234567</p>
          <p><strong>Hours:</strong> Mon – Sat, 10am – 7pm</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {sent && <p className="contact-success">Thanks! Your message has been sent.</p>}

          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            placeholder="How can we help?"
            required
          />

          <button type="submit" className="contact-btn">Send Message</button>
        </form>
      </div>
    </div>
  )
}
