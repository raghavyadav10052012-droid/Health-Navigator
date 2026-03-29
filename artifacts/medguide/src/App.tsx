import { useState, useEffect, useRef, ReactNode } from "react";

const BASE = import.meta.env.BASE_URL;

/* ── Scroll-reveal hook ──────────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}) {
  const { ref, visible } = useReveal();
  const transform = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    none: "none",
  }[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transform,
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ── Global styles ───────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #f7f3ee;
    color: #0d1f1a;
    -webkit-font-smoothing: antialiased;
  }

  h1,h2,h3 { font-family: 'Cormorant Garamond', Georgia, serif; }

  /* Animated pulse ring on CTA */
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: 0.6; }
    70%  { transform: scale(1.25); opacity: 0;   }
    100% { transform: scale(1.25); opacity: 0;   }
  }
  .pulse-btn { position: relative; display: inline-block; }
  .pulse-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 8px;
    background: #c9a84c;
    animation: pulse-ring 2.2s ease-out infinite;
    pointer-events: none;
    z-index: 0;
  }
  .pulse-btn > * { position: relative; z-index: 1; }

  /* Floating blobs in hero */
  @keyframes float1 {
    0%,100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-24px) scale(1.04); }
  }
  @keyframes float2 {
    0%,100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(18px) scale(0.96); }
  }
  .blob1 { animation: float1 7s ease-in-out infinite; }
  .blob2 { animation: float2 9s ease-in-out infinite; }

  /* Shimmer on gold bar */
  @keyframes shimmer {
    0%  { background-position: -200% center; }
    100%{ background-position:  200% center; }
  }
  .gold-bar {
    display: inline-block;
    width: 52px; height: 3px;
    border-radius: 2px;
    background: linear-gradient(90deg, #c9a84c 0%, #f0d080 50%, #c9a84c 100%);
    background-size: 200% auto;
    animation: shimmer 2.5s linear infinite;
    margin-bottom: 20px;
  }

  /* Hover lift for cards */
  .card-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: default;
  }
  .card-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 48px rgba(26,107,74,0.15) !important;
  }

  /* Stagger children */
  .stagger > *:nth-child(1) { transition-delay: 0ms  !important; }
  .stagger > *:nth-child(2) { transition-delay: 120ms !important; }
  .stagger > *:nth-child(3) { transition-delay: 240ms !important; }
  .stagger > *:nth-child(4) { transition-delay: 360ms !important; }

  /* Nav link underline */
  .nav-link {
    position: relative; text-decoration: none;
    color: #0d1f1a; font-size: 15px; font-weight: 500;
    transition: color 0.2s;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -3px; left: 0;
    width: 0; height: 2px; background: #1a6b4a;
    transition: width 0.3s ease;
  }
  .nav-link:hover { color: #1a6b4a; }
  .nav-link:hover::after { width: 100%; }

  /* Button transitions */
  .btn-green {
    background: #1a6b4a; color: #f7f3ee;
    border: none; border-radius: 8px;
    padding: 13px 28px; font-size: 15px; font-weight: 700;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s;
  }
  .btn-green:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 24px rgba(26,107,74,0.35);
    background: #165c3e;
  }
  .btn-gold {
    background: #c9a84c; color: #0d1f1a;
    border: none; border-radius: 8px;
    padding: 13px 32px; font-size: 15px; font-weight: 700;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }
  .btn-gold:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 24px rgba(201,168,76,0.45);
  }
  .btn-outline-light {
    background: transparent; color: #f7f3ee;
    border: 2px solid rgba(247,243,238,0.4); border-radius: 8px;
    padding: 11px 28px; font-size: 15px; font-weight: 600;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.22s ease;
  }
  .btn-outline-light:hover {
    border-color: rgba(247,243,238,0.85);
    background: rgba(247,243,238,0.09);
    transform: translateY(-2px);
  }

  /* Step icon bounce */
  @keyframes bounce-in {
    0%   { transform: scale(0.6); opacity: 0; }
    60%  { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); }
  }
  .step-icon-wrap { animation: none; }
  .step-icon-wrap.animate { animation: bounce-in 0.5s ease forwards; }

  /* Section separator */
  .sep {
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(201,168,76,0.35), transparent);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .desktop-links { display: none !important; }
    .hamburger     { display: flex !important; }
  }
  @media (min-width: 769px) {
    .hamburger   { display: none !important; }
    .mobile-menu { display: none !important; }
  }

  /* Hero stat grid */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }
  @media (max-width: 600px) {
    .stat-grid { grid-template-columns: repeat(2, 1fr); }
  }

  /* How It Works grid */
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  @media (max-width: 768px) {
    .steps-grid { grid-template-columns: 1fr; }
  }

  /* AI cards grid */
  .ai-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (max-width: 768px) {
    .ai-grid { grid-template-columns: 1fr; }
  }

  /* Footer flex */
  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }
  @media (max-width: 640px) {
    .footer-inner {
      flex-direction: column;
      text-align: center;
      align-items: center;
    }
  }

  /* Hero CTA buttons */
  .hero-ctas {
    display: flex;
    gap: 14px;
    justify-content: center;
    flex-wrap: wrap;
  }

  /* Doctor card centered */
  .doc-card-wrap {
    display: flex;
    justify-content: center;
  }

  /* Spinning border on doc photo */
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .doc-ring {
    position: absolute; inset: -6px;
    border-radius: 50%;
    border: 2px dashed rgba(201,168,76,0.5);
    animation: spin-slow 12s linear infinite;
  }

  /* Number counter pop */
  @keyframes pop {
    0%  { transform: scale(0.5); opacity: 0; }
    70% { transform: scale(1.1); }
    100%{ transform: scale(1);   opacity: 1; }
  }
  .stat-num { animation: pop 0.6s ease forwards; opacity: 0; }
  .stat-num.go { animation: pop 0.6s ease forwards; }
`;

/* ── Navbar ──────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Home",        href: "#hero" },
    { label: "How It Works",href: "#how-it-works" },
    { label: "Our Doctors", href: "#doctors" },
    { label: "Location",    href: "#location" },
    { label: "AI Features", href: "#ai" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(247,243,238,0.97)" : "#f7f3ee",
      boxShadow: scrolled ? "0 2px 20px rgba(13,31,26,0.10)" : "none",
      borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, background: "#1a6b4a", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#f7f3ee", fontSize: 17 }}>✚</span>
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 700, color: "#0d1f1a" }}>MedGuide</span>
        </a>

        {/* Desktop links */}
        <div className="desktop-links" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {links.map(l => <a key={l.href} href={l.href} className="nav-link">{l.label}</a>)}
          <a href="tel:+919753632223" style={{ textDecoration: "none" }}>
            <button className="btn-green" style={{ padding: "10px 20px", fontSize: 14 }}>Book Appointment</button>
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setOpen(o => !o)}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: "#0d1f1a", display: "none", alignItems: "center", padding: 6 }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="mobile-menu"
        style={{
          background: "#f7f3ee",
          padding: open ? "12px 20px 20px" : "0 20px",
          maxHeight: open ? 400 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease, padding 0.4s ease",
          borderTop: "1px solid rgba(201,168,76,0.2)",
        }}
      >
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
            display: "block", padding: "11px 0",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            color: "#0d1f1a", textDecoration: "none",
            fontSize: 15, fontWeight: 500,
          }}>{l.label}</a>
        ))}
        <a href="tel:+919753632223" style={{ textDecoration: "none" }}>
          <button className="btn-green" style={{ width: "100%", marginTop: 14 }}>Book Appointment</button>
        </a>
      </div>
    </nav>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────── */
function StatNum({ value, delay }: { value: string; delay: number }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div ref={ref} style={{
      fontFamily: "'Cormorant Garamond',serif",
      fontSize: "clamp(28px,6vw,40px)", fontWeight: 700, color: "#c9a84c",
      opacity: visible ? 1 : 0,
      transform: visible ? "scale(1)" : "scale(0.5)",
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      lineHeight: 1, marginBottom: 6,
    }}>{value}</div>
  );
}

function Hero() {
  const stats = [
    { value: "50+",  label: "Doctors" },
    { value: "98%",  label: "Satisfaction" },
    { value: "5 min",label: "Match" },
    { value: "24/7", label: "AI Support" },
  ];

  return (
    <section id="hero" style={{
      minHeight: "100svh",
      background: "linear-gradient(145deg,#0d1f1a 0%,#1a6b4a 55%,#1f7d55 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "100px 20px 72px",
      textAlign: "center", position: "relative", overflow: "hidden",
    }}>
      {/* Floating blobs */}
      <div className="blob1" style={{ position:"absolute", top:"-80px", right:"-80px", width:"420px", height:"420px", borderRadius:"50%", background:"rgba(201,168,76,0.07)", pointerEvents:"none" }} />
      <div className="blob2" style={{ position:"absolute", bottom:"-60px", left:"-60px", width:"360px", height:"360px", borderRadius:"50%", background:"rgba(247,243,238,0.05)", pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:1, maxWidth:780, width:"100%" }}>

        <Reveal delay={0}>
          <div style={{ display:"inline-block", background:"rgba(201,168,76,0.14)", border:"1px solid rgba(201,168,76,0.35)", color:"#c9a84c", padding:"5px 18px", borderRadius:100, fontSize:12, fontWeight:700, letterSpacing:"1.2px", textTransform:"uppercase", marginBottom:26 }}>
            Indore's Premier Healthcare Navigator
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(38px,8vw,76px)", fontWeight:700, color:"#f7f3ee", lineHeight:1.08, margin:"0 0 22px", letterSpacing:"-1px" }}>
            Find the Right Doctor,{" "}
            <em style={{ color:"#c9a84c", fontStyle:"italic" }}>Not Just Any Doctor</em>
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p style={{ fontSize:"clamp(15px,2vw,17px)", color:"rgba(247,243,238,0.78)", lineHeight:1.75, margin:"0 auto 36px", maxWidth:580 }}>
            MedGuide connects Indore residents with the right specialist in minutes.
            No guesswork, no referral delays — just expert care matched to your unique health needs.
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div className="hero-ctas" style={{ marginBottom:60 }}>
            <a href="#doctors" style={{ textDecoration:"none" }}>
              <div className="pulse-btn">
                <button className="btn-gold">Find My Doctor</button>
              </div>
            </a>
            <a href="#how-it-works" style={{ textDecoration:"none" }}>
              <button className="btn-outline-light">How It Works</button>
            </a>
          </div>
        </Reveal>

        {/* Stats */}
        <div className="stat-grid stagger">
          {stats.map((s, i) => (
            <Reveal key={i} delay={480 + i * 80} direction="up">
              <div style={{ background:"rgba(247,243,238,0.07)", border:"1px solid rgba(247,243,238,0.12)", borderRadius:14, padding:"20px 12px", backdropFilter:"blur(8px)" }}>
                <StatNum value={s.value} delay={500 + i * 80} />
                <div style={{ fontSize:12, color:"rgba(247,243,238,0.62)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.6px" }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How It Works ────────────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { num:"01", icon:"📋", title:"Describe Symptoms", desc:"Tell us what you're experiencing in plain language. Our intake form captures the details that matter most to find your match." },
    { num:"02", icon:"🎯", title:"Get Matched",       desc:"Our engine analyses your symptoms and connects you with the right specialist in Indore within minutes — no wait." },
    { num:"03", icon:"📅", title:"Book & Visit",      desc:"Instantly confirm your appointment. Walk in confidently, knowing you're in exactly the right hands." },
  ];

  return (
    <section id="how-it-works" style={{ padding:"90px 20px", background:"#f7f3ee" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <Reveal><div className="gold-bar" /></Reveal>
          <Reveal delay={100}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(34px,5vw,54px)", fontWeight:700, color:"#0d1f1a", marginBottom:14, lineHeight:1.15 }}>How It Works</h2>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontSize:16, color:"#5a7a6e", maxWidth:440, margin:"0 auto", lineHeight:1.7 }}>Three simple steps to expert care in Indore</p>
          </Reveal>
        </div>

        <div className="steps-grid">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 150} direction={i === 0 ? "left" : i === 2 ? "right" : "up"}>
              <div className="card-lift" style={{ background:"#fff", borderRadius:18, padding:"32px 26px 28px", border:"1px solid rgba(201,168,76,0.15)", position:"relative", overflow:"hidden", height:"100%" }}>
                <div style={{ position:"absolute", top:14, right:18, fontFamily:"'Cormorant Garamond',serif", fontSize:64, fontWeight:700, color:"rgba(26,107,74,0.07)", lineHeight:1, pointerEvents:"none" }}>{s.num}</div>
                <div style={{ width:54, height:54, background:"rgba(26,107,74,0.09)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, marginBottom:18 }}>{s.icon}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:"#0d1f1a", marginBottom:10 }}>{s.title}</h3>
                <p style={{ fontSize:15, color:"#5a7a6e", lineHeight:1.7, margin:0 }}>{s.desc}</p>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"linear-gradient(to right,#1a6b4a,#c9a84c)", opacity:0.6 }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Doctors Section ─────────────────────────────────────────────────── */
type Doctor = {
  name: string;
  specialty: string;
  address: string;
  phone?: string;
  timing?: string;
  exp?: string;
  hasPhoto?: boolean;
};

const DOCTORS: Doctor[] = [
  { name:"Dr. R.N. Yadav",                specialty:"Cardiologist",         address:"Heart Care Center, Indore",                          exp:"20+ yrs exp" },
  { name:"Dr. Girish Kawthekar",           specialty:"Cardiologist",         address:"Medanta Hospital, Vijay Nagar",                       phone:"0731-474-7185", exp:"41+ yrs exp" },
  { name:"Dr. Sagheer Ahmad Qureshi",      specialty:"Cardiologist",         address:"Medanta Hospital, Vijay Nagar",                       phone:"0731-474-7185", exp:"26+ yrs exp" },
  { name:"Dr. Deepesh Kothari",            specialty:"Cardiologist",         address:"V One Hospital, AB Road",                            phone:"0731-358-8888" },
  { name:"Dr. Shailendra Trivedi",         specialty:"Cardiologist",         address:"Vishesh Jupiter Hospital, Ring Road",                 phone:"0731-471-8111" },
  { name:"Dr. Vikram Balwani",             specialty:"General Physician",    address:"Choithram Hospital, Manik Bagh Road",                 phone:"0731-236-2491" },
  { name:"Dr. Sumit Sinha",               specialty:"General Physician",    address:"GSS Clinic, FG-45 Scheme-54, Vijay Nagar",            phone:"062629-24365", timing:"Mon–Sat 11AM–5PM, 6:30–9PM" },
  { name:"Dr. Moiz Topiwala",             specialty:"General Physician",    address:"Vijay Nagar, Indore",                                exp:"MBBS, DNB" },
  { name:"Dr. Shailendra Jain",           specialty:"Orthopedic Surgeon",   address:"Dr. Jain's Orthopedic Clinic",                       exp:"18+ yrs exp" },
  { name:"Dr. Sandeep Singh",             specialty:"Neurologist",          address:"Aastha Clinic, Indore",                              exp:"15+ yrs exp" },
  { name:"Dr. Partisha Narayan Bhargava", specialty:"Neurologist",          address:"V One Hospital, AB Road",                            phone:"0731-358-8888" },
  { name:"Dr. S.K. Patidar",              specialty:"Urologist",            address:"Medanta Hospital, Vijay Nagar",                       phone:"0731-474-7185", exp:"20+ yrs exp" },
  { name:"Dr. Sudhir Bansal",             specialty:"Oncologist",           address:"Bansal Cancer Hospital",                             phone:"0731-234-0477", exp:"25+ yrs exp" },
  { name:"Dr. Vivek Mehta",               specialty:"Dermatologist",        address:"Skin & Hair Clinic, Indore",                         exp:"12+ yrs exp" },
  { name:"Dr. Jagrati Yadav",             specialty:"Homeopathy Doctor",    address:"N-100, Singapore Green View, Vijay Nagar, Indore",   phone:"+91 97536 32223", timing:"Mon–Sat 9:00 AM – 7:00 PM", hasPhoto:true },
];

const SPECIALTY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Cardiologist":      { bg:"rgba(220,53,69,0.12)",  text:"#b02a37", border:"rgba(220,53,69,0.28)" },
  "General Physician": { bg:"rgba(26,107,74,0.11)",  text:"#1a6b4a", border:"rgba(26,107,74,0.28)" },
  "Orthopedic Surgeon":{ bg:"rgba(100,80,180,0.11)", text:"#5040a0", border:"rgba(100,80,180,0.28)" },
  "Neurologist":       { bg:"rgba(13,110,253,0.11)", text:"#0d5dc5", border:"rgba(13,110,253,0.28)" },
  "Urologist":         { bg:"rgba(32,178,170,0.11)", text:"#108080", border:"rgba(32,178,170,0.28)" },
  "Oncologist":        { bg:"rgba(220,130,50,0.12)", text:"#b06010", border:"rgba(220,130,50,0.28)" },
  "Dermatologist":     { bg:"rgba(201,168,76,0.14)", text:"#8a6a00", border:"rgba(201,168,76,0.35)" },
  "Homeopathy Doctor": { bg:"rgba(76,175,80,0.12)",  text:"#2e7d32", border:"rgba(76,175,80,0.30)" },
};

const ALL_SPECIALTIES = ["All", ...Array.from(new Set(DOCTORS.map(d => d.specialty)))];

function initials(name: string) {
  return name.replace("Dr. ", "").split(" ").slice(0,2).map(w => w[0]).join("").toUpperCase();
}

function DoctorMiniCard({ doc, idx }: { doc: Doctor; idx: number }) {
  const sc = SPECIALTY_COLORS[doc.specialty] ?? { bg:"rgba(26,107,74,0.11)", text:"#1a6b4a", border:"rgba(26,107,74,0.28)" };
  const phoneHref = doc.phone ? `tel:${doc.phone.replace(/\s/g,"")}` : undefined;

  return (
    <Reveal delay={Math.min(idx, 5) * 80} direction="up">
      <div className="card-lift" style={{ background:"#fff", borderRadius:18, overflow:"hidden", border:"1px solid rgba(201,168,76,0.18)", boxShadow:"0 4px 20px rgba(13,31,26,0.07)", display:"flex", flexDirection:"column", height:"100%" }}>

        {/* Card header */}
        <div style={{ background:"linear-gradient(135deg,#1a6b4a 0%,#0d1f1a 100%)", padding:doc.hasPhoto?"32px 20px 22px":"24px 20px 20px", textAlign:"center", position:"relative" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 30% 20%,rgba(201,168,76,0.13) 0%,transparent 60%)", pointerEvents:"none" }} />

          {doc.hasPhoto ? (
            <div style={{ position:"relative", width:96, height:96, margin:"0 auto 14px" }}>
              <div className="doc-ring" />
              <div style={{ width:96, height:96, borderRadius:"50%", border:"3px solid #c9a84c", overflow:"hidden", boxShadow:"0 6px 18px rgba(0,0,0,0.3)", position:"relative", zIndex:1 }}>
                <img src={`${BASE}dr-jagrati-yadav.png`} alt={doc.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }} />
              </div>
            </div>
          ) : (
            <div style={{ width:80, height:80, borderRadius:"50%", border:"3px solid rgba(201,168,76,0.5)", background:"rgba(247,243,238,0.10)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", position:"relative", zIndex:1 }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:"#c9a84c" }}>{initials(doc.name)}</span>
            </div>
          )}

          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:700, color:"#f7f3ee", marginBottom:8, lineHeight:1.2, position:"relative", zIndex:1 }}>{doc.name}</h3>
          <div style={{ display:"inline-block", background:sc.bg, border:`1px solid ${sc.border}`, color:sc.text, padding:"3px 12px", borderRadius:100, fontSize:12, fontWeight:700, position:"relative", zIndex:1 }}>
            {doc.specialty}
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding:"20px 20px 16px", display:"flex", flexDirection:"column", flex:1 }}>
          <div style={{ flex:1 }}>
            {[
              { icon:"📍", label:"Address", val: doc.address },
              ...(doc.exp   ? [{ icon:"⭐", label:"Experience", val: doc.exp }]   : []),
              ...(doc.phone ? [{ icon:"📞", label:"Phone",      val: doc.phone }]  : []),
              ...(doc.timing? [{ icon:"🕐", label:"Hours",      val: doc.timing }] : []),
            ].map((row, i) => (
              <div key={i}>
                {i > 0 && <div style={{ height:1, background:"rgba(201,168,76,0.1)", margin:"10px 0" }} />}
                <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                  <div style={{ width:30, height:30, background:"rgba(26,107,74,0.08)", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:14 }}>{row.icon}</div>
                  <div>
                    <div style={{ fontSize:10, color:"#9ab0a8", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:2 }}>{row.label}</div>
                    <div style={{ fontSize:13, color:"#0d1f1a", lineHeight:1.45 }}>
                      {row.label === "Phone" && phoneHref
                        ? <a href={phoneHref} style={{ color:"#1a6b4a", fontWeight:600, textDecoration:"none" }}>{row.val}</a>
                        : row.val}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a href={phoneHref ?? "tel:+919753632223"} style={{ textDecoration:"none", display:"block", marginTop:18 }}>
            <button className="btn-green" style={{ width:"100%", padding:"11px 14px", fontSize:13 }}>
              📞 Call to Book
            </button>
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function DoctorsSection() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? DOCTORS : DOCTORS.filter(d => d.specialty === active);

  return (
    <section id="doctors" style={{ padding:"90px 20px", background:"linear-gradient(180deg,#eee8e0 0%,#f7f3ee 100%)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>

        {/* Heading */}
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <Reveal><div className="gold-bar" /></Reveal>
          <Reveal delay={100}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(34px,5vw,54px)", fontWeight:700, color:"#0d1f1a", marginBottom:12 }}>Our Doctors</h2>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontSize:16, color:"#5a7a6e", maxWidth:480, margin:"0 auto", lineHeight:1.7 }}>
              15 trusted specialists across Indore — handpicked for expertise and patient care
            </p>
          </Reveal>
        </div>

        {/* Specialty filter */}
        <Reveal delay={150}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center", marginBottom:48 }}>
            {ALL_SPECIALTIES.map(sp => {
              const isActive = active === sp;
              const sc = SPECIALTY_COLORS[sp];
              return (
                <button
                  key={sp}
                  onClick={() => setActive(sp)}
                  style={{
                    padding:"7px 16px", borderRadius:100, fontSize:13, fontWeight:600,
                    cursor:"pointer", border:"1px solid",
                    fontFamily:"'DM Sans',sans-serif",
                    transition:"all 0.22s ease",
                    background: isActive ? "#1a6b4a" : (sc ? sc.bg : "rgba(26,107,74,0.08)"),
                    color:      isActive ? "#f7f3ee" : (sc ? sc.text : "#1a6b4a"),
                    borderColor:isActive ? "#1a6b4a" : (sc ? sc.border : "rgba(26,107,74,0.25)"),
                    boxShadow:  isActive ? "0 4px 14px rgba(26,107,74,0.3)" : "none",
                    transform:  isActive ? "translateY(-1px)" : "none",
                  }}
                >
                  {sp === "All" ? `All (${DOCTORS.length})` : sp}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Doctor grid */}
        <div className="doctors-grid">
          {filtered.map((doc, i) => (
            <DoctorMiniCard key={doc.name} doc={doc} idx={i} />
          ))}
        </div>

        {/* Count badge */}
        <Reveal delay={100}>
          <p style={{ textAlign:"center", marginTop:40, fontSize:14, color:"#9ab0a8", fontFamily:"'DM Sans',sans-serif" }}>
            Showing {filtered.length} of {DOCTORS.length} doctors
          </p>
        </Reveal>
      </div>

      <style>{`
        .doctors-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .doctors-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .doctors-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

/* ── Map ─────────────────────────────────────────────────────────────── */
function MapSection() {
  return (
    <section id="location" style={{ padding:"80px 20px", background:"#f7f3ee" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:44 }}>
          <Reveal><div className="gold-bar" /></Reveal>
          <Reveal delay={100}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(30px,5vw,50px)", fontWeight:700, color:"#0d1f1a", marginBottom:10 }}>Find the Clinic</h2>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontSize:15, color:"#5a7a6e" }}>Singapore Green View Township, Vijay Nagar, Indore</p>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <div style={{ borderRadius:18, overflow:"hidden", border:"1px solid rgba(201,168,76,0.2)", boxShadow:"0 8px 30px rgba(13,31,26,0.10)" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.5!2d75.905614!3d22.800864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963849d2b1b6e97%3A0xe5d96adbc9d9a3bb!2sSINGAPORE%20GREEN%20VIEW%20TOWNSHIP!5e0!3m2!1sen!2sin"
              width="100%" height="420" style={{ border:0, display:"block" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Dr. Jagrati Yadav Clinic Location"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── AI Section ──────────────────────────────────────────────────────── */
function AISection() {
  const features = [
    { icon:"🩺", title:"Symptom Checker",   desc:"Describe your symptoms in natural language and get an AI-powered preliminary assessment before visiting a doctor." },
    { icon:"📄", title:"Report Simplifier", desc:"Upload your medical reports and get clear, simple explanations of your test results — no medical jargon." },
    { icon:"🏥", title:"Hospital Guide",     desc:"Navigate Indore's hospitals with AI — find the right department, get directions, and understand procedures." },
  ];

  return (
    <section id="ai" style={{ padding:"96px 20px", background:"linear-gradient(135deg,#0d1f1a 0%,#1a6b4a 100%)", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse at 70% 30%,rgba(201,168,76,0.09) 0%,transparent 60%),radial-gradient(ellipse at 20% 80%,rgba(247,243,238,0.04) 0%,transparent 50%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1100, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <Reveal>
            <div style={{ display:"inline-block", background:"rgba(201,168,76,0.15)", border:"1px solid rgba(201,168,76,0.3)", color:"#c9a84c", padding:"5px 16px", borderRadius:100, fontSize:11, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:20 }}>Coming Soon</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(34px,5vw,56px)", fontWeight:700, color:"#f7f3ee", marginBottom:16, lineHeight:1.15 }}>AI-Powered Health Tools</h2>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontSize:16, color:"rgba(247,243,238,0.65)", maxWidth:500, margin:"0 auto", lineHeight:1.7 }}>
              The next generation of healthcare navigation is almost here — intelligent tools that make healthcare accessible to everyone in Indore.
            </p>
          </Reveal>
        </div>

        <div className="ai-grid" style={{ marginBottom:48 }}>
          {features.map((f, i) => (
            <Reveal key={i} delay={i * 140} direction="up">
              <div className="card-lift" style={{ background:"rgba(247,243,238,0.05)", border:"1px solid rgba(247,243,238,0.10)", borderRadius:18, padding:"30px 24px", backdropFilter:"blur(8px)", height:"100%" }}>
                <div style={{ fontSize:38, marginBottom:16 }}>{f.icon}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, color:"#f7f3ee", marginBottom:10 }}>{f.title}</h3>
                <p style={{ fontSize:14, color:"rgba(247,243,238,0.60)", lineHeight:1.7, margin:0 }}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} direction="none">
          <div style={{ textAlign:"center" }}>
            <button className="btn-gold" onClick={() => alert("You'll be notified when AI features launch!")}>
              Notify Me When It Launches
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background:"#0d1f1a", padding:"40px 20px" }}>
      <div className="footer-inner" style={{ maxWidth:1100, margin:"0 auto" }}>
        <a href="#hero" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32, height:32, background:"#1a6b4a", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"#f7f3ee", fontSize:14 }}>✚</span>
          </div>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:700, color:"#f7f3ee" }}>MedGuide</span>
        </a>
        <p style={{ fontSize:14, color:"rgba(247,243,238,0.55)", fontFamily:"'DM Sans',sans-serif" }}>
          © 2026 MedGuide. All rights reserved. Indore's trusted healthcare navigator.
        </p>
        <a href="tel:+919753632223" style={{ color:"#c9a84c", textDecoration:"none", fontSize:15, fontWeight:600 }}>
          +91 97536 32223
        </a>
      </div>
    </footer>
  );
}

/* ── AI Chat Widget ──────────────────────────────────────────────────── */
type Msg = { role: "user" | "assistant"; content: string };

const CHAT_CSS = `
  .chat-bubble-user {
    background: #1a6b4a;
    color: #f7f3ee;
    border-radius: 16px 16px 4px 16px;
    align-self: flex-end;
  }
  .chat-bubble-assistant {
    background: #fff;
    color: #0d1f1a;
    border: 1px solid rgba(201,168,76,0.2);
    border-radius: 16px 16px 16px 4px;
    align-self: flex-start;
  }
  @keyframes chat-open {
    from { opacity:0; transform: scale(0.85) translateY(20px); }
    to   { opacity:1; transform: scale(1)    translateY(0); }
  }
  .chat-open { animation: chat-open 0.3s ease forwards; }
  @keyframes typing-dot {
    0%,80%,100% { transform:scale(0.6); opacity:0.4; }
    40%         { transform:scale(1);   opacity:1; }
  }
  .typing-dot {
    width:7px; height:7px; background:#1a6b4a; border-radius:50%;
    display:inline-block; margin:0 2px;
    animation: typing-dot 1.2s ease infinite;
  }
  .typing-dot:nth-child(2) { animation-delay:0.2s; }
  .typing-dot:nth-child(3) { animation-delay:0.4s; }
  .chat-send-btn {
    background: #1a6b4a; color: #f7f3ee;
    border: none; border-radius: 10px;
    width: 40px; height: 40px;
    cursor: pointer; font-size: 18px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s, transform 0.15s;
  }
  .chat-send-btn:hover:not(:disabled) { background:#145538; transform:scale(1.07); }
  .chat-send-btn:disabled { opacity:0.5; cursor:default; }
  .chat-input {
    flex: 1; border: 1px solid rgba(26,107,74,0.25);
    border-radius: 10px; padding: 10px 14px;
    font-size: 14px; font-family: 'DM Sans', sans-serif;
    outline: none; resize: none;
    background: #fff; color: #0d1f1a;
    transition: border-color 0.2s;
    max-height: 100px; overflow-y: auto;
  }
  .chat-input:focus { border-color: #1a6b4a; }
  .chat-input::placeholder { color: #9ab0a8; }
  @keyframes fab-pulse {
    0%,100% { box-shadow: 0 0 0 0   rgba(26,107,74,0.5); }
    50%      { box-shadow: 0 0 0 12px rgba(26,107,74,0); }
  }
  .chat-fab { animation: fab-pulse 2.5s ease-in-out infinite; }
`;

function ChatWidget() {
  const [open, setOpen]   = useState(false);
  const [msgs, setMsgs]   = useState<Msg[]>([
    { role: "assistant", content: "👋 Hi! I'm MedGuide AI. Tell me your symptoms and I'll help you find the right doctor in Indore." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Msg = { role: "user", content: text };
    const history = [...msgs, userMsg];
    setMsgs(history);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json() as { reply?: string; error?: string };
      setMsgs(prev => [...prev, { role: "assistant", content: data.reply ?? data.error ?? "Sorry, something went wrong." }]);
    } catch {
      setMsgs(prev => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      <style>{CHAT_CSS}</style>

      {/* FAB */}
      <button
        className="chat-fab"
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI health assistant"
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 2000,
          width: 60, height: 60, borderRadius: "50%",
          background: "linear-gradient(135deg,#1a6b4a,#0d3d28)",
          border: "3px solid rgba(201,168,76,0.6)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, color: "#f7f3ee",
          transition: "transform 0.2s",
          transform: open ? "scale(0.9) rotate(10deg)" : "scale(1)",
        }}
      >
        {open ? "✕" : "🩺"}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="chat-open"
          style={{
            position: "fixed", bottom: 100, right: 28, zIndex: 1999,
            width: "min(380px, calc(100vw - 40px))",
            background: "#f7f3ee",
            borderRadius: 20,
            boxShadow: "0 24px 60px rgba(13,31,26,0.22), 0 4px 16px rgba(13,31,26,0.12)",
            border: "1px solid rgba(201,168,76,0.25)",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
            maxHeight: "min(520px, calc(100svh - 160px))",
          }}
        >
          {/* Header */}
          <div style={{ background: "linear-gradient(135deg,#1a6b4a,#0d3d28)", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(201,168,76,0.2)", border: "2px solid #c9a84c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🩺</div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 700, color: "#f7f3ee", lineHeight: 1.2 }}>MedGuide AI</div>
              <div style={{ fontSize: 12, color: "rgba(247,243,238,0.65)", fontFamily: "'DM Sans',sans-serif" }}>Indore Doctor Finder</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
              <span style={{ fontSize: 11, color: "rgba(247,243,238,0.7)", fontFamily: "'DM Sans',sans-serif" }}>Online</span>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: 10 }}>
            {msgs.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "chat-bubble-user" : "chat-bubble-assistant"}
                style={{ padding: "10px 14px", fontSize: 14, lineHeight: 1.55, maxWidth: "85%", fontFamily: "'DM Sans',sans-serif", whiteSpace: "pre-wrap" }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble-assistant" style={{ padding: "10px 14px", display: "inline-flex", alignItems: "center", gap: 2 }}>
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(201,168,76,0.15)", flexShrink: 0 }} />

          {/* Input row */}
          <div style={{ padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-end", background: "#f7f3ee", flexShrink: 0 }}>
            <textarea
              className="chat-input"
              rows={1}
              placeholder="Describe your symptoms..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              disabled={loading}
            />
            <button className="chat-send-btn" onClick={send} disabled={loading || !input.trim()} aria-label="Send">
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ── App ─────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Navbar />
      <Hero />
      <div className="sep" />
      <HowItWorks />
      <div className="sep" />
      <DoctorsSection />
      <MapSection />
      <AISection />
      <Footer />
      <ChatWidget />
    </>
  );
}
