import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="inspira-footer">
      <div className="inspira-footer-inner">
        <a href="#" className="inspira-footer-logo-wrap">
          <img src="/assets/inspira-logo.webp" alt="Inspira" className="inspira-footer-logo-img" />
          <span className="inspira-footer-logo-text">Inspira</span>
        </a>
        <div className="inspira-footer-social">
          {/* Facebook */}
          <a href="#" aria-label="Facebook">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          {/* Twitter */}
          <a href="#" aria-label="Twitter">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
          </a>
          {/* YouTube */}
          <a href="#" aria-label="YouTube">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.545 12 3.545 12 3.545s-7.52 0-9.388.51A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.48 20.455 12 20.455 12 20.455s7.52 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          {/* RSS Feed */}
          <a href="#" aria-label="RSS Feed">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="4.5" cy="19.5" r="2.5"/><path d="M4 11.5a8.5 8.5 0 0 1 8.5 8.5h3A11.5 11.5 0 0 0 4 8.5v3z"/><path d="M4 5.5A14.5 14.5 0 0 1 18.5 20h3A17.5 17.5 0 0 0 4 2.5v3z"/></svg>
          </a>
          {/* Google+ */}
          <a href="#" aria-label="Google+">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
