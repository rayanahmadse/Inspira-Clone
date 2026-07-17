import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', remember: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // no backend - demo only
    console.log('login:', form);
    navigate('/');
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Login</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>&gt;</span> <span>Login</span>
          </div>
        </div>
      </div>

      <div className="auth-page container">
        <form className="auth-box" onSubmit={handleSubmit}>
          <label>Username or email <span className="req">*</span></label>
          <input name="username" type="text" value={form.username} onChange={handleChange} required />

          <label>Passwords <span className="req">*</span></label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required />

          <div className="auth-row">
            <button type="submit" className="btn-dark">LOGIN</button>
            <label className="remember">
              <input name="remember" type="checkbox" checked={form.remember} onChange={handleChange} />
              Remember me
            </label>
          </div>

          <Link to="/login" className="lost-pass">Lost your password?</Link>
        </form>
      </div>
    </>
  );
}
