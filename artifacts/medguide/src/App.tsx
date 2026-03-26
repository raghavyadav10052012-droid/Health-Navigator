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

/* ── Doctor Card ─────────────────────────────────────────────────────── */
function DoctorCard() {
  return (
    <section id="doctors" style={{ padding:"90px 20px", background:"linear-gradient(180deg,#eee8e0 0%,#f7f3ee 100%)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <Reveal><div className="gold-bar" /></Reveal>
          <Reveal delay={100}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(34px,5vw,54px)", fontWeight:700, color:"#0d1f1a", marginBottom:14 }}>Featured Doctor</h2>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontSize:16, color:"#5a7a6e", maxWidth:440, margin:"0 auto", lineHeight:1.7 }}>Trusted specialists hand-picked for their expertise and patient care</p>
          </Reveal>
        </div>

        <div className="doc-card-wrap">
          <Reveal delay={100} direction="up">
            <div className="card-lift" style={{ background:"#fff", borderRadius:22, overflow:"hidden", border:"1px solid rgba(201,168,76,0.2)", maxWidth:420, width:"100%", boxShadow:"0 8px 30px rgba(13,31,26,0.08)" }}>
              {/* Card header */}
              <div style={{ background:"linear-gradient(135deg,#1a6b4a 0%,#0d1f1a 100%)", padding:"44px 28px 32px", textAlign:"center", position:"relative" }}>
                <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 30% 20%,rgba(201,168,76,0.15) 0%,transparent 60%)", pointerEvents:"none" }} />

                {/* Photo with spinning ring */}
                <div style={{ position:"relative", width:130, height:130, margin:"0 auto 20px" }}>
                  <div className="doc-ring" />
                  <div style={{ width:130, height:130, borderRadius:"50%", border:"4px solid #c9a84c", overflow:"hidden", boxShadow:"0 8px 24px rgba(0,0,0,0.3)", position:"relative", zIndex:1 }}>
                    <img src={`${BASE}dr-jagrati-yadav.png`} alt="Dr. Jagrati Yadav" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }} />
                  </div>
                </div>

                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:700, color:"#f7f3ee", marginBottom:8, position:"relative", zIndex:1 }}>Dr. Jagrati Yadav</h3>
                <div style={{ display:"inline-block", background:"rgba(201,168,76,0.18)", border:"1px solid rgba(201,168,76,0.4)", color:"#c9a84c", padding:"4px 16px", borderRadius:100, fontSize:13, fontWeight:600, position:"relative", zIndex:1 }}>
                  Homeopathy Doctor
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding:"28px 28px 24px" }}>
                {[
                  { icon:"📍", label:"Address", content: <span>N-100, Singapore Green View, Vijay Nagar, Indore, MP</span> },
                  { icon:"📞", label:"Phone",   content: <a href="tel:+919753632223" style={{ color:"#1a6b4a", fontWeight:600, textDecoration:"none", fontSize:15 }}>+91 97536 32223</a> },
                  { icon:"🕐", label:"Hours",   content: <span>Mon – Sat, 9:00 AM – 7:00 PM</span> },
                ].map((row, idx) => (
                  <div key={idx}>
                    {idx > 0 && <div style={{ height:1, background:"rgba(201,168,76,0.1)", margin:"14px 0" }} />}
                    <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                      <div style={{ width:36, height:36, background:"rgba(26,107,74,0.08)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:16 }}>{row.icon}</div>
                      <div>
                        <div style={{ fontSize:11, color:"#9ab0a8", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:3 }}>{row.label}</div>
                        <div style={{ fontSize:14, color:"#0d1f1a", lineHeight:1.5 }}>{row.content}</div>
                      </div>
                    </div>
                  </div>
                ))}

                <a href="tel:+919753632223" style={{ textDecoration:"none", display:"block", marginTop:24 }}>
                  <button className="btn-green" style={{ width:"100%", padding:14, fontSize:15 }}>
                    📞 Call to Book Appointment
                  </button>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
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
      <DoctorCard />
      <MapSection />
      <AISection />
      <Footer />
    </>
  );
}
