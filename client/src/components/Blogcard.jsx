import "../styles/BlogCard.css";

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: "middle", marginRight: 5}}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export default function BlogCard({ post }) {
  const { title, date, excerpt, image } = post;

  return (
    <div className="inspira-blog-card">
      <a href="#" className="inspira-blog-img-wrap">
        <img src={image} alt={title} />
      </a>
      <div className="inspira-blog-info">
        <h4>{title.toUpperCase()}</h4>
        <p className="inspira-blog-date"><CalendarIcon />{date}</p>
        <p className="inspira-blog-excerpt">{excerpt}</p>
        <a href="#" className="inspira-read-more">Continue Reading</a>
      </div>
    </div>
  );
}
