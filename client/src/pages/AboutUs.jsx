import { Link } from 'react-router-dom';
import '../styles/AboutUs.css';

const stats = [
  { icon: '👥', value: '2169', label: 'HAPPY CUSTOMERS' },
  { icon: '🏆', value: '869', label: 'AWARDS WINNED' },
  { icon: '⏱️', value: '689', label: 'HOURS WORKED' },
  { icon: '👍', value: '2169', label: 'COMPLETE PROJECTS' },
];

const skills = [
  { label: 'DESIGN', value: 90 },
  { label: 'BRANDING', value: 60 },
  { label: 'WEBSITES', value: 75 },
  { label: 'BRADING', value: 80 },
];

export default function About() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>About Us 02</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>&gt;</span> <span>About Us 02</span>
          </div>
        </div>
      </div>

      <section className="about-intro container">
        <h2>WE CREATE WORDPRESS THEMES</h2>
        <p>
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
          consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan
          et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis
          dolore te feugait nulla facilisi.
        </p>
        <img src="/assets/pages/about-mockup.png" alt="mockup" className="about-mockup" />
      </section>

      <section className="about-stats">
        {stats.map((s) => (
          <div className="stat-box" key={s.label}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="about-skills-wrap">
        <div className="about-image">
          <img src="/assets/pages/about-desk.jpg" alt="desk" />
        </div>
        <div className="about-skills container">
          <h3>WE HAVE SKILLS TO SHOW</h3>
          {skills.map((s) => (
            <div className="skill-row" key={s.label}>
              <div className="skill-top">
                <span>{s.label}</span>
                <span>{s.value}%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: `${s.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
