import "../styles/ServiceBar.css";


const ReturnIcon = () => (
  <svg className="inspira-svc-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ShippingIcon = () => (
  <svg className="inspira-svc-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5c.8-.8.8-2 0-2.8s-2-.8-2.8 0L13.2 8.2l-8.2-1.8L3 8.2l7 3.5-3.5 3.5-3.5-1-1.2 1.2 4.2 2.1 2.1 4.2 1.2-1.2-1-3.5 3.5-3.5 3.5 7 1.8-1.8z" />
  </svg>
);

const SupportIcon = () => (
  <svg className="inspira-svc-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const MoneyIcon = () => (
  <svg className="inspira-svc-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const services = [
  { Icon: ReturnIcon,   title: "Free Return",   desc: "30 days money back guarantee!" },
  { Icon: ShippingIcon, title: "Free Shipping",  desc: "Free shipping on all order" },
  { Icon: SupportIcon,  title: "Support 24",    desc: "We support online 24 hours a day" },
  { Icon: MoneyIcon,    title: "Money Back",    desc: "30 DAYS - Money back guarantee" },
];

export default function ServiceBar() {
  return (
    <div className="inspira-service-bar">
      {services.map(({ Icon, title, desc }, i) => (
        <div key={i} className="inspira-service-item">
          <Icon />
          <div>
            <h4>{title}</h4>
            <p>{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
