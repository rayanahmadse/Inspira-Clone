import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Contact.css';

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', subject: '', message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('contact form:', form);
    alert('Message sent (demo only, no backend).');
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Contact</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>&gt;</span> <span>Contact</span>
          </div>
        </div>
      </div>

      <div className="contact-map">
        <iframe
          title="location"
          src="https://www.google.com/maps?q=Collins%20St%2C%20West%20Melbourne%20VIC%203003%2C%20Australia&output=embed"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>

      <div className="contact-body container">
        <div className="contact-form-col">
          <h2>TELL US YOUR PROJECT</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input name="firstName" placeholder="First Name*" value={form.firstName} onChange={handleChange} required />
              <input name="lastName" placeholder="Last Name*" value={form.lastName} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <input type="email" name="email" placeholder="Email*" value={form.email} onChange={handleChange} required />
              <input name="subject" placeholder="Subject*" value={form.subject} onChange={handleChange} required />
            </div>
            <textarea name="message" placeholder="Message" rows="6" value={form.message} onChange={handleChange} />
            <button type="submit" className="btn-send">SEND EMAIL</button>
          </form>
        </div>

        <div className="contact-info-col">
          <h2>CONTACT-US</h2>
          <p>
            Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium
            lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram
            anteposuerit litterarum formas human.
          </p>
          <hr />
          <div className="info-line"><span>📍</span> Address : No 40 Baria Sreet 133/2 NewYork City</div>
          <div className="info-line"><span>📞</span> info@example.com</div>
          <div className="info-line"><span>✉️</span> 0(1234) 567 890</div>
          <h3>Working Hours</h3>
          <p>Monday – Saturday: 08AM – 22PM</p>
        </div>
      </div>
    </>
  );
}
