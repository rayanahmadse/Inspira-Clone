import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Auth.css';

const countries = ['Select A Country', 'Pakistan', 'United States', 'United Kingdom', 'Australia', 'Canada'];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', company: '', email: '', phone: '',
    country: '', address: '', address2: '', city: '', state: '', zip: '',
    password: '', confirmPassword: '', agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agree) {
      alert('Please agree to Terms & Condition.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    console.log('register:', form);
    navigate('/login');
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Register</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>&gt;</span> <span>Register</span>
          </div>
        </div>
      </div>

      <div className="auth-page container">
        <form className="auth-box register-box" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="field">
              <label>First Name <span className="req">*</span></label>
              <input name="firstName" value={form.firstName} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Last Name <span className="req">*</span></label>
              <input name="lastName" value={form.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div className="field">
            <label>Company Name</label>
            <input name="company" value={form.company} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="field">
              <label>Email Address <span className="req">*</span></label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Phone <span className="req">*</span></label>
              <input name="phone" value={form.phone} onChange={handleChange} required />
            </div>
          </div>

          <div className="field">
            <label>Country <span className="req">*</span></label>
            <select name="country" value={form.country} onChange={handleChange} required>
              {countries.map((c) => <option key={c} value={c === 'Select A Country' ? '' : c}>{c}</option>)}
            </select>
          </div>

          <div className="field">
            <label>Address <span className="req">*</span></label>
            <input name="address" placeholder="Street address" value={form.address} onChange={handleChange} required />
          </div>
          <div className="field">
            <input name="address2" placeholder="Apartment, suite, unit etc. (optional)" value={form.address2} onChange={handleChange} />
          </div>

          <div className="field">
            <label>Town / City <span className="req">*</span></label>
            <input name="city" value={form.city} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="field">
              <label>State / County <span className="req">*</span></label>
              <input name="state" value={form.state} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Postcode / Zip <span className="req">*</span></label>
              <input name="zip" value={form.zip} onChange={handleChange} required />
            </div>
          </div>

          <div className="field">
            <label>Account password <span className="req">*</span></label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          <div className="field">
            <label>Confirm password <span className="req">*</span></label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
          </div>

          <label className="agree-row">
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
            I agree <Link to="/terms">Terms &amp; Condition</Link>
          </label>

          <button type="submit" className="btn-dark">REGISTER</button>
        </form>
      </div>
    </>
  );
}
