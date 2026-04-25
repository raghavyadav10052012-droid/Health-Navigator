import { useState, useEffect, useRef, ReactNode } from "react";

const BASE = import.meta.env.BASE_URL;

/* ── Scroll-reveal ───────────────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}
function Reveal({ children, delay = 0, direction = "up", className = "" }: {
  children: ReactNode; delay?: number; direction?: "up"|"left"|"right"|"none"; className?: string;
}) {
  const { ref, visible } = useReveal();
  const t = { up:"translateY(32px)", left:"translateX(-32px)", right:"translateX(32px)", none:"none" }[direction];
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : t,
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      willChange: "opacity, transform",
    }}>{children}</div>
  );
}

/* ── Design tokens ───────────────────────────────────────────────────── */
const C = {
  primary:   "#0B6E4F",
  primary2:  "#0D8860",
  light:     "#E8F5F0",
  lighter:   "#F2FAF6",
  white:     "#FFFFFF",
  bg:        "#F8FAFB",
  text:      "#111827",
  muted:     "#6B7280",
  border:    "#E5E7EB",
  danger:    "#DC2626",
  warning:   "#D97706",
  blue:      "#2563EB",
  purple:    "#7C3AED",
  teal:      "#0D9488",
  orange:    "#EA580C",
};

/* ── Global CSS ──────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: ${C.bg};
    color: ${C.text};
    -webkit-font-smoothing: antialiased;
    line-height: 1.6;
  }

  /* Nav links */
  .nav-link {
    text-decoration: none; color: #374151; font-size: 14px; font-weight: 500;
    padding: 6px 2px; border-bottom: 2px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }
  .nav-link:hover { color: ${C.primary}; border-color: ${C.primary}; }

  /* Buttons */
  .btn-primary {
    background: ${C.primary}; color: #fff;
    border: none; border-radius: 10px;
    padding: 12px 24px; font-size: 14px; font-weight: 600;
    cursor: pointer; font-family: inherit;
    transition: background 0.2s, transform 0.18s, box-shadow 0.18s;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .btn-primary:hover {
    background: ${C.primary2};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(11,110,79,0.28);
  }
  .btn-outline {
    background: transparent; color: ${C.primary};
    border: 1.5px solid ${C.primary}; border-radius: 10px;
    padding: 11px 24px; font-size: 14px; font-weight: 600;
    cursor: pointer; font-family: inherit;
    transition: all 0.2s;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .btn-outline:hover {
    background: ${C.light}; transform: translateY(-2px);
  }
  .btn-outline-white {
    background: transparent; color: #fff;
    border: 1.5px solid rgba(255,255,255,0.55); border-radius: 10px;
    padding: 11px 24px; font-size: 14px; font-weight: 600;
    cursor: pointer; font-family: inherit;
    transition: all 0.2s;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .btn-outline-white:hover { background: rgba(255,255,255,0.12); border-color: #fff; }
  .btn-sm {
    padding: 8px 16px !important; font-size: 13px !important;
  }

  /* Cards */
  .card {
    background: #fff; border-radius: 14px;
    border: 1px solid ${C.border};
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(11,110,79,0.10);
  }

  /* Section header */
  .section-label {
    display: inline-flex; align-items: center; gap: 6px;
    background: ${C.light}; color: ${C.primary};
    padding: 5px 14px; border-radius: 100px;
    font-size: 12px; font-weight: 700; letter-spacing: 0.5px;
    text-transform: uppercase; margin-bottom: 14px;
  }

  /* Section divider */
  .divider {
    height: 1px; background: ${C.border}; margin: 0;
  }

  /* Responsive nav */
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .hamburger   { display: flex !important; }
  }
  @media (min-width: 769px) {
    .hamburger   { display: none !important; }
    .mobile-menu { display: none !important; }
  }

  /* Grids */
  .doctors-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (max-width: 960px) { .doctors-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .doctors-grid { grid-template-columns: 1fr; } }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    align-items: stretch;
  }
  @media (max-width: 768px) { .steps-grid { grid-template-columns: 1fr; } }

  .ai-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (max-width: 768px) { .ai-grid { grid-template-columns: 1fr; } }

  .footer-cols {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 40px;
  }
  @media (max-width: 768px) { .footer-cols { grid-template-columns: 1fr 1fr; gap: 32px; } }
  @media (max-width: 480px) { .footer-cols { grid-template-columns: 1fr; } }

  /* Hero two-col */
  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }
  @media (max-width: 820px) {
    .hero-grid {
      grid-template-columns: 1fr;
      gap: 36px;
    }
    .hero-grid .hero-card-col {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 8px;
    }
    .hero-grid .hero-card-col > div {
      min-width: 300px;
    }
  }

  /* Map two-col */
  .map-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: start;
  }
  @media (max-width: 820px) {
    .map-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  /* Hero CTA buttons */
  .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }

  /* Small-info grid in map */
  .clinic-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  @media (max-width: 480px) {
    .clinic-info-grid { grid-template-columns: 1fr 1fr; }
  }

  .stat-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 600px) { .stat-strip { grid-template-columns: repeat(2, 1fr); } }

  /* Hero floating shapes */
  @keyframes float-a {
    0%,100% { transform: translateY(0) rotate(0deg); }
    50%      { transform: translateY(-18px) rotate(4deg); }
  }
  @keyframes float-b {
    0%,100% { transform: translateY(0) rotate(0deg); }
    50%      { transform: translateY(14px) rotate(-3deg); }
  }
  .shape-a { animation: float-a 8s ease-in-out infinite; }
  .shape-b { animation: float-b 10s ease-in-out infinite; }

  /* Pill filter buttons */
  .filter-pill {
    padding: 7px 16px; border-radius: 100px;
    font-size: 13px; font-weight: 600;
    cursor: pointer; border: 1.5px solid ${C.border};
    background: #fff; color: ${C.muted};
    transition: all 0.18s ease;
    font-family: inherit;
  }
  .filter-pill:hover { border-color: ${C.primary}; color: ${C.primary}; }
  .filter-pill.active {
    background: ${C.primary}; color: #fff; border-color: ${C.primary};
    box-shadow: 0 4px 12px rgba(11,110,79,0.22);
  }

  /* Rating stars */
  .stars { color: #F59E0B; font-size: 12px; letter-spacing: 1px; }

  /* Chat styles */
  .chat-bubble-user {
    background: ${C.primary}; color: #fff;
    border-radius: 16px 16px 4px 16px; align-self: flex-end;
  }
  .chat-bubble-assistant {
    background: #fff; color: ${C.text};
    border: 1px solid ${C.border};
    border-radius: 16px 16px 16px 4px; align-self: flex-start;
  }
  @keyframes chat-open {
    from { opacity:0; transform: scale(0.88) translateY(16px); }
    to   { opacity:1; transform: scale(1)    translateY(0); }
  }
  .chat-open { animation: chat-open 0.28s ease forwards; }
  @keyframes typing-dot {
    0%,80%,100% { transform:scale(0.6); opacity:0.35; }
    40%         { transform:scale(1);   opacity:1; }
  }
  .typing-dot {
    width:7px; height:7px; background:${C.primary}; border-radius:50%;
    display:inline-block; margin:0 2px;
    animation: typing-dot 1.2s ease infinite;
  }
  .typing-dot:nth-child(2) { animation-delay:0.2s; }
  .typing-dot:nth-child(3) { animation-delay:0.4s; }
  .chat-input {
    flex:1; border:1.5px solid ${C.border};
    border-radius:10px; padding:10px 14px;
    font-size:14px; font-family:inherit;
    outline:none; resize:none;
    background:#fff; color:${C.text};
    transition:border-color 0.2s;
    max-height:100px; overflow-y:auto;
  }
  .chat-input:focus { border-color:${C.primary}; }
  .chat-input::placeholder { color:#9CA3AF; }
  @keyframes fab-pulse {
    0%,100% { box-shadow: 0 0 0 0   rgba(11,110,79,0.45); }
    50%      { box-shadow: 0 0 0 10px rgba(11,110,79,0); }
  }
  .chat-fab { animation: fab-pulse 2.8s ease-in-out infinite; }
  .chat-send {
    background:${C.primary}; color:#fff; border:none; border-radius:10px;
    width:40px; height:40px; cursor:pointer; font-size:17px;
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
    transition:background 0.18s, transform 0.15s;
  }
  .chat-send:hover:not(:disabled) { background:${C.primary2}; transform:scale(1.06); }
  .chat-send:disabled { opacity:0.45; cursor:default; }
`;

/* ══════════════════════════════════════════════════════════════════════
   DONATE MODAL
══════════════════════════════════════════════════════════════════════ */
function DonateModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:3000,
      background:"rgba(0,0,0,0.55)", backdropFilter:"blur(4px)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:20,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:"#fff", borderRadius:24,
        padding:"28px 24px 24px", maxWidth:360, width:"100%",
        boxShadow:"0 24px 64px rgba(0,0,0,0.22)",
        textAlign:"center", position:"relative",
        animation:"modal-in 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
      }}>
        <style>{`
          @keyframes modal-in {
            from { opacity:0; transform:scale(0.85) translateY(20px); }
            to   { opacity:1; transform:scale(1) translateY(0); }
          }
        `}</style>

        {/* Close */}
        <button onClick={onClose} style={{
          position:"absolute", top:14, right:14,
          background:"#F3F4F6", border:"none", borderRadius:"50%",
          width:32, height:32, cursor:"pointer", fontSize:16,
          display:"flex", alignItems:"center", justifyContent:"center",
          color:C.muted, transition:"background 0.18s",
        }}>✕</button>

        {/* Heart icon */}
        <div style={{ fontSize:36, marginBottom:8 }}>💚</div>
        <h2 style={{ fontSize:22, fontWeight:800, color:C.text, marginBottom:6 }}>Support MedGuide</h2>
        <p style={{ fontSize:14, color:C.muted, lineHeight:1.6, marginBottom:20 }}>
          Scan the QR code below to donate via Paytm UPI and help us keep healthcare navigation free for Indore.
        </p>

        {/* QR card */}
        <div style={{
          border:`1px solid ${C.border}`, borderRadius:16, overflow:"hidden",
          boxShadow:"0 4px 16px rgba(0,0,0,0.08)", marginBottom:18,
        }}>
          <img
            src={`${BASE}paytm-qr.jpg`}
            alt="Paytm QR Code — Jagrati Homeopathy Clinic"
            style={{ width:"100%", height:"auto", display:"block" }}
          />
        </div>

        <div style={{ background:C.lighter, borderRadius:10, padding:"10px 14px", fontSize:13, color:C.primary, fontWeight:600, marginBottom:16 }}>
          📱 Open Paytm / any UPI app → Scan QR → Done!
        </div>

        <button className="btn-primary" onClick={onClose} style={{ width:"100%", justifyContent:"center", padding:"12px" }}>
          Done — Thank You 💚
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [donate, setDonate] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Home",         href: "#hero" },
    { label: "Find Doctors", href: "#doctors" },
    { label: "AI Tools",     href: "#ai" },
    { label: "Location",     href: "#location" },
  ];

  return (
    <>
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(255,255,255,0.97)" : "#fff",
      boxShadow: scrolled ? "0 1px 16px rgba(0,0,0,0.08)" : "0 1px 0 #E5E7EB",
      backdropFilter: "blur(12px)",
      transition: "box-shadow 0.3s",
    }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:72 }}>
        <a href="#hero" style={{ textDecoration:"none", display:"flex", alignItems:"center" }}>
          <img src={`${BASE}logo.png`} alt="Health Navigator" style={{ height:56, width:"auto", objectFit:"contain" }} />
        </a>

        <div className="desktop-nav" style={{ display:"flex", alignItems:"center", gap:32 }}>
          {links.map(l => <a key={l.href} href={l.href} className="nav-link">{l.label}</a>)}
        </div>

        <div className="desktop-nav" style={{ display:"flex", alignItems:"center", gap:12 }}>
          <button className="btn-sm" onClick={() => setDonate(true)} style={{
            background:"linear-gradient(135deg,#16A34A,#15803D)", color:"#fff",
            border:"none", borderRadius:10, padding:"8px 16px", fontSize:13, fontWeight:700,
            cursor:"pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:5,
            transition:"transform 0.18s, box-shadow 0.18s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform="translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow="0 6px 16px rgba(21,128,61,0.35)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform="translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow="none"; }}
          >
            💚 Donate
          </button>
          <a href="tel:+919753632223" style={{ textDecoration:"none" }}>
            <button className="btn-outline btn-sm">📞 Contact</button>
          </a>
          <a href="#doctors" style={{ textDecoration:"none" }}>
            <button className="btn-primary btn-sm">Book Appointment</button>
          </a>
        </div>

        <button className="hamburger" onClick={() => setOpen(o => !o)}
          style={{ background:"none", border:"none", cursor:"pointer", fontSize:22, color:C.text, display:"none", alignItems:"center", padding:6 }}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      <div className="mobile-menu" style={{
        background:"#fff", borderTop:`1px solid ${C.border}`,
        maxHeight: open ? 420 : 0, overflow:"hidden",
        transition:"max-height 0.4s ease",
      }}>
        <div style={{ padding:"12px 24px 20px" }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display:"block", padding:"12px 0",
              borderBottom:`1px solid ${C.border}`,
              color:C.text, textDecoration:"none", fontSize:15, fontWeight:500,
            }}>{l.label}</a>
          ))}
          <button onClick={() => { setDonate(true); setOpen(false); }} style={{
            width:"100%", marginTop:12, padding:"12px", borderRadius:10, border:"none",
            background:"linear-gradient(135deg,#16A34A,#15803D)", color:"#fff",
            fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit",
            display:"flex", alignItems:"center", justifyContent:"center", gap:6,
          }}>
            💚 Donate — Support Us
          </button>
          <a href="#doctors" style={{ textDecoration:"none", display:"block", marginTop:10 }}>
            <button className="btn-primary" style={{ width:"100%" }}>Book Appointment</button>
          </a>
        </div>
      </div>
    </nav>
    {donate && <DonateModal onClose={() => setDonate(false)} />}
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════════════ */
function Hero() {
  const stats = [
    { icon:"👨‍⚕️", value:"15+",  label:"Verified Doctors" },
    { icon:"⭐",   value:"4.8",  label:"Avg. Rating" },
    { icon:"📅",   value:"5 min", label:"Avg. Match Time" },
    { icon:"🤖",   value:"24/7", label:"AI Support" },
  ];

  return (
    <section id="hero" style={{
      minHeight:"100svh",
      background:`linear-gradient(135deg, #063d2c 0%, ${C.primary} 50%, #14996b 100%)`,
      display:"flex", flexDirection:"column", justifyContent:"center",
      padding:"90px 24px 0", position:"relative", overflow:"hidden",
    }}>
      {/* Decorative shapes */}
      <div className="shape-a" style={{ position:"absolute", top:"-100px", right:"-60px", width:480, height:480, borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
      <div className="shape-b" style={{ position:"absolute", bottom:"80px", left:"-80px", width:360, height:360, borderRadius:"50%", background:"rgba(255,255,255,0.03)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"20%", right:"8%", width:120, height:120, borderRadius:"30px", background:"rgba(255,255,255,0.05)", transform:"rotate(20deg)", pointerEvents:"none" }} />

      <div className="hero-grid" style={{ maxWidth:1100, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>

        {/* Left: text */}
        <div>
          <Reveal>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.22)", color:"#fff", padding:"5px 14px", borderRadius:100, fontSize:12, fontWeight:600, letterSpacing:"0.5px", marginBottom:20 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#4ADE80", display:"inline-block" }} />
              Indore's Trusted Healthcare Navigator
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 style={{ fontSize:"clamp(34px,4.5vw,58px)", fontWeight:800, color:"#fff", lineHeight:1.1, marginBottom:20, letterSpacing:"-0.5px" }}>
              Find the Right Doctor,{" "}
              <span style={{ color:"#6EE7B7" }}>Anytime.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p style={{ fontSize:"clamp(15px,1.5vw,17px)", color:"rgba(255,255,255,0.78)", lineHeight:1.75, marginBottom:32, maxWidth:480 }}>
              MedGuide connects Indore residents with the right specialist in minutes. No guesswork, no delays — just expert care matched to your needs.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:48 }}>
              <a href="#doctors" style={{ textDecoration:"none" }}>
                <button className="btn-primary" style={{ padding:"13px 28px", fontSize:15 }}>
                  🔍 Find Doctors
                </button>
              </a>
              <a href="#ai" style={{ textDecoration:"none" }}>
                <button className="btn-outline-white" style={{ padding:"13px 28px", fontSize:15 }}>
                  🤖 Check Symptoms
                </button>
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                {[1,2,3,4,5].map(i => <span key={i} style={{ color:"#FCD34D", fontSize:16 }}>★</span>)}
              </div>
              <span style={{ fontSize:13, color:"rgba(255,255,255,0.72)" }}>Trusted by 1,000+ patients in Indore</span>
            </div>
          </Reveal>
        </div>

        {/* Right: visual card */}
        <Reveal delay={200} direction="right" className="hero-card-col">
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
            <div style={{ background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.18)", borderRadius:24, padding:28, backdropFilter:"blur(16px)", maxWidth:360, width:"100%" }}>
              <div style={{ background:"#fff", borderRadius:16, padding:20, marginBottom:16 }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                  <div style={{ width:48, height:48, borderRadius:"50%", border:`3px solid ${C.primary}`, overflow:"hidden" }}>
                    <img src={`${BASE}dr-jagrati-yadav.png`} alt="Dr. Jagrati Yadav" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:14, color:C.text }}>Dr. Jagrati Yadav</div>
                    <div style={{ fontSize:12, color:C.muted }}>Homeopathy Doctor</div>
                    <div style={{ fontSize:11, color:"#F59E0B" }}>★★★★★ 5.0</div>
                  </div>
                </div>
                <div style={{ background:C.lighter, borderRadius:10, padding:"10px 14px", fontSize:13, color:C.primary, fontWeight:600 }}>
                  📍 Vijay Nagar, Indore · Mon–Sat 9AM–7PM
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {["❤️ Cardiologist","🧠 Neurologist","🦴 Orthopedic","🩺 General"].map(s => (
                  <div key={s} style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:10, padding:"9px 12px", fontSize:12, fontWeight:600, color:"#fff", textAlign:"center" }}>{s}</div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

      </div>

      {/* Stats strip */}
      <div style={{ maxWidth:1100, margin:"48px auto 0", width:"100%", position:"relative", zIndex:1 }}>
        <div className="stat-strip" style={{ background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:"20px 20px 0 0", backdropFilter:"blur(12px)", overflow:"hidden" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding:"22px 16px", textAlign:"center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
              <div style={{ fontSize:22, marginBottom:6 }}>{s.icon}</div>
              <div style={{ fontSize:"clamp(22px,3vw,30px)", fontWeight:800, color:"#fff", lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.65)", marginTop:4, fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   HOW IT WORKS
══════════════════════════════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { num:"01", icon:"💬", color:C.primary,   bg:C.light,   title:"Describe Symptoms", desc:"Tell us what you're experiencing in plain language. Our AI picks up every detail that matters." },
    { num:"02", icon:"🎯", color:C.blue,      bg:"#EFF6FF",  title:"Get Matched",        desc:"Our system analyses your symptoms and connects you with the exact right specialist — in minutes." },
    { num:"03", icon:"📅", color:C.orange,    bg:"#FFF7ED",  title:"Book & Visit",       desc:"Confirm your appointment instantly. Walk in knowing you're in exactly the right hands." },
  ];

  return (
    <section id="how-it-works" style={{ padding:"80px 24px", background:"#fff" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <div className="section-label">How It Works</div>
            <h2 style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:800, color:C.text, lineHeight:1.2, marginBottom:12 }}>
              3 Simple Steps to Expert Care
            </h2>
            <p style={{ fontSize:16, color:C.muted, maxWidth:420, margin:"0 auto" }}>
              From symptom to specialist in under 5 minutes
            </p>
          </div>
        </Reveal>

        <div className="steps-grid">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="card" style={{ padding:"32px 26px", height:"100%", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:16, right:20, fontWeight:800, fontSize:52, color:`${s.color}0D`, lineHeight:1, fontVariantNumeric:"tabular-nums" }}>{s.num}</div>
                <div style={{ width:52, height:52, borderRadius:14, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, marginBottom:20, border:`1px solid ${s.color}22` }}>{s.icon}</div>
                <h3 style={{ fontSize:18, fontWeight:700, color:C.text, marginBottom:10 }}>{s.title}</h3>
                <p style={{ fontSize:14, color:C.muted, lineHeight:1.7 }}>{s.desc}</p>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:s.color, borderRadius:"0 0 14px 14px", opacity:0.7 }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   DOCTORS
══════════════════════════════════════════════════════════════════════ */
type Doctor = {
  name: string; specialty: string; address: string;
  phone?: string; timing?: string; exp?: string;
  hasPhoto?: boolean; rating: number;
};

const DOCTORS: Doctor[] = [
  { name:"Dr. R.N. Yadav",                specialty:"Cardiologist",         address:"Heart Care Center, Indore",                        exp:"20+ yrs",  rating:4.8 },
  { name:"Dr. Girish Kawthekar",           specialty:"Cardiologist",         address:"Medanta Hospital, Vijay Nagar",                     phone:"0731-474-7185", exp:"41+ yrs", rating:4.9 },
  { name:"Dr. Sagheer Ahmad Qureshi",      specialty:"Cardiologist",         address:"Medanta Hospital, Vijay Nagar",                     phone:"0731-474-7185", exp:"26+ yrs", rating:4.7 },
  { name:"Dr. Deepesh Kothari",            specialty:"Cardiologist",         address:"V One Hospital, AB Road",                          phone:"0731-358-8888", rating:4.6 },
  { name:"Dr. Shailendra Trivedi",         specialty:"Cardiologist",         address:"Vishesh Jupiter Hospital, Ring Road",               phone:"0731-471-8111", rating:4.7 },
  { name:"Dr. Vikram Balwani",             specialty:"General Physician",    address:"Choithram Hospital, Manik Bagh Road",               phone:"0731-236-2491", rating:4.5 },
  { name:"Dr. Sumit Sinha",               specialty:"General Physician",    address:"GSS Clinic, FG-45, Vijay Nagar",                   phone:"062629-24365", timing:"Mon–Sat 11AM–9PM", rating:4.8 },
  { name:"Dr. Moiz Topiwala",             specialty:"General Physician",    address:"Vijay Nagar, Indore",                              exp:"MBBS, DNB", rating:4.6 },
  { name:"Dr. Shailendra Jain",           specialty:"Orthopedic Surgeon",   address:"Dr. Jain's Orthopedic Clinic",                     exp:"18+ yrs", rating:4.9 },
  { name:"Dr. Sandeep Singh",             specialty:"Neurologist",          address:"Aastha Clinic, Indore",                            exp:"15+ yrs", rating:4.7 },
  { name:"Dr. Partisha Narayan Bhargava", specialty:"Neurologist",          address:"V One Hospital, AB Road",                          phone:"0731-358-8888", rating:4.8 },
  { name:"Dr. S.K. Patidar",              specialty:"Urologist",            address:"Medanta Hospital, Vijay Nagar",                     phone:"0731-474-7185", exp:"20+ yrs", rating:4.6 },
  { name:"Dr. Sudhir Bansal",             specialty:"Oncologist",           address:"Bansal Cancer Hospital",                           phone:"0731-234-0477", exp:"25+ yrs", rating:4.9 },
  { name:"Dr. Vivek Mehta",               specialty:"Dermatologist",        address:"Skin & Hair Clinic, Indore",                       exp:"12+ yrs", rating:4.7 },
  { name:"Dr. Jagrati Yadav",             specialty:"Homeopathy Doctor",    address:"N-100, Singapore Green View, Vijay Nagar",          phone:"+91 97536 32223", timing:"Mon–Sat 9AM–7PM", hasPhoto:true, rating:5.0 },
];

const SP_COLORS: Record<string, { bg:string; text:string }> = {
  "Cardiologist":       { bg:"#FEE2E2", text:"#B91C1C" },
  "General Physician":  { bg:C.light,   text:C.primary },
  "Orthopedic Surgeon": { bg:"#EDE9FE", text:"#6D28D9" },
  "Neurologist":        { bg:"#DBEAFE", text:"#1D4ED8" },
  "Urologist":          { bg:"#CCFBF1", text:"#0F766E" },
  "Oncologist":         { bg:"#FEF3C7", text:"#B45309" },
  "Dermatologist":      { bg:"#FCE7F3", text:"#9D174D" },
  "Homeopathy Doctor":  { bg:"#DCFCE7", text:"#166534" },
};

const ALL_SPECS = ["All", ...Array.from(new Set(DOCTORS.map(d => d.specialty)))];
function initials(name: string) { return name.replace("Dr. ","").split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase(); }
function stars(r: number) { return "★".repeat(Math.floor(r)) + (r % 1 >= 0.5 ? "½" : ""); }

function DoctorCard({ doc }: { doc: Doctor }) {
  const sc = SP_COLORS[doc.specialty] ?? { bg:C.light, text:C.primary };
  const tel = doc.phone ? `tel:${doc.phone.replace(/\s/g,"")}` : "tel:+919753632223";
  return (
    <div className="card" style={{ overflow:"hidden", display:"flex", flexDirection:"column" }}>
      {/* Top strip */}
      <div style={{ background:`linear-gradient(135deg, ${C.primary} 0%, #0D9466 100%)`, padding:"20px 18px 16px", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)", pointerEvents:"none" }} />
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:56, height:56, borderRadius:"50%", border:"2.5px solid rgba(255,255,255,0.5)", overflow:"hidden", background:"rgba(255,255,255,0.15)", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            {doc.hasPhoto
              ? <img src={`${BASE}dr-jagrati-yadav.png`} alt={doc.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }} />
              : <span style={{ fontWeight:700, fontSize:18, color:"#fff" }}>{initials(doc.name)}</span>
            }
          </div>
          <div>
            <div style={{ fontWeight:700, fontSize:15, color:"#fff", lineHeight:1.3, marginBottom:4 }}>{doc.name}</div>
            <span style={{ background:sc.bg, color:sc.text, padding:"2px 10px", borderRadius:100, fontSize:11, fontWeight:700 }}>{doc.specialty}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding:"14px 18px 18px", flex:1, display:"flex", flexDirection:"column", gap:10 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <span className="stars">{stars(doc.rating)}</span>
            <span style={{ fontSize:12, color:C.muted, marginLeft:5 }}>{doc.rating}</span>
          </div>
          {doc.exp && <span style={{ fontSize:12, color:C.muted, background:C.bg, padding:"2px 8px", borderRadius:6 }}>{doc.exp}</span>}
        </div>

        <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
          <span style={{ fontSize:13, flexShrink:0, marginTop:1 }}>📍</span>
          <span style={{ fontSize:13, color:C.muted, lineHeight:1.5 }}>{doc.address}</span>
        </div>

        {doc.timing && (
          <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
            <span style={{ fontSize:13, flexShrink:0, marginTop:1 }}>🕐</span>
            <span style={{ fontSize:12, color:C.muted }}>{doc.timing}</span>
          </div>
        )}

        <a href={tel} style={{ textDecoration:"none", marginTop:"auto", display:"block" }}>
          <button className="btn-primary" style={{ width:"100%", padding:"10px 16px", fontSize:13, justifyContent:"center" }}>
            📞 Book Now
          </button>
        </a>
      </div>
    </div>
  );
}

function DoctorsSection() {
  const [active, setActive] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const filtered = active === "All" ? DOCTORS : DOCTORS.filter(d => d.specialty === active);
  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="doctors" style={{ padding:"80px 24px", background:C.bg }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <Reveal>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:16, marginBottom:36 }}>
            <div>
              <div className="section-label">Our Specialists</div>
              <h2 style={{ fontSize:"clamp(26px,3.5vw,40px)", fontWeight:800, color:C.text, lineHeight:1.2 }}>Find Doctors Near You</h2>
              <p style={{ fontSize:15, color:C.muted, marginTop:6 }}>15 trusted specialists across Indore — verified & rated</p>
            </div>
            <div style={{ fontSize:13, color:C.muted }}>
              Showing <strong style={{ color:C.text }}>{visible.length}</strong> of <strong style={{ color:C.text }}>{filtered.length}</strong> doctors
            </div>
          </div>
        </Reveal>

        {/* Filters */}
        <Reveal delay={80}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:32 }}>
            {ALL_SPECS.map(sp => (
              <button key={sp} className={`filter-pill${active === sp ? " active" : ""}`} onClick={() => { setActive(sp); setShowAll(false); }}>
                {sp === "All" ? `All (${DOCTORS.length})` : sp}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="doctors-grid">
          {visible.map((doc, i) => (
            <Reveal key={doc.name} delay={Math.min(i % 3, 2) * 80}>
              <DoctorCard doc={doc} />
            </Reveal>
          ))}
        </div>

        {/* View All toggle */}
        {filtered.length > 6 && (
          <Reveal delay={100}>
            <div style={{ textAlign:"center", marginTop:40 }}>
              <button className="btn-outline" style={{ padding:"12px 32px" }} onClick={() => setShowAll(v => !v)}>
                {showAll ? "Show Less ↑" : `View All ${filtered.length} Doctors →`}
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAP
══════════════════════════════════════════════════════════════════════ */
function MapSection() {
  return (
    <section id="location" style={{ padding:"80px 24px", background:"#fff" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Reveal>
          <div className="map-grid">

            {/* Left: info */}
            <div>
              <div className="section-label">📍 Location</div>
              <h2 style={{ fontSize:"clamp(24px,3.5vw,38px)", fontWeight:800, color:C.text, lineHeight:1.2, marginBottom:14 }}>Visit the Clinic</h2>
              <p style={{ fontSize:15, color:C.muted, lineHeight:1.7, marginBottom:28 }}>
                Dr. Jagrati Yadav's clinic is conveniently located in Singapore Green View Township, Vijay Nagar — one of Indore's most accessible healthcare hubs.
              </p>

              {/* Clinic card */}
              <div className="card" style={{ padding:20, marginBottom:16 }}>
                <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:C.light, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>🏥</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:15, color:C.text, marginBottom:4 }}>Dr. Jagrati Yadav — Homeopathy Clinic</div>
                    <div style={{ fontSize:13, color:C.muted, lineHeight:1.5 }}>N-100, Singapore Green View Township,<br/>Vijay Nagar, Indore, MP</div>
                  </div>
                </div>
              </div>

              <div className="clinic-info-grid">
                {[
                  { icon:"📞", label:"Phone",   val:"+91 97536 32223" },
                  { icon:"🕐", label:"Hours",   val:"Mon–Sat, 9AM–7PM" },
                  { icon:"🚇", label:"Nearby",  val:"Vijay Nagar Square" },
                  { icon:"⭐", label:"Rating",  val:"5.0 / 5.0" },
                ].map(r => (
                  <div key={r.label} style={{ background:C.bg, borderRadius:10, padding:"12px 14px", border:`1px solid ${C.border}` }}>
                    <div style={{ fontSize:18, marginBottom:4 }}>{r.icon}</div>
                    <div style={{ fontSize:11, color:C.muted, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.4px", marginBottom:2 }}>{r.label}</div>
                    <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{r.val}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop:20 }}>
                <a href="tel:+919753632223" style={{ textDecoration:"none" }}>
                  <button className="btn-primary" style={{ padding:"12px 24px" }}>📞 Call for Directions</button>
                </a>
              </div>
            </div>

            {/* Right: map */}
            <div>
              <div style={{ borderRadius:16, overflow:"hidden", border:`1px solid ${C.border}`, boxShadow:"0 4px 20px rgba(0,0,0,0.08)" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.5!2d75.905614!3d22.800864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963849d2b1b6e97%3A0xe5d96adbc9d9a3bb!2sSINGAPORE%20GREEN%20VIEW%20TOWNSHIP!5e0!3m2!1sen!2sin"
                  width="100%" height="360" style={{ border:0, display:"block" }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  title="Dr. Jagrati Yadav Clinic Location"
                />
              </div>
              <div style={{ background:C.light, borderRadius:10, padding:"10px 14px", marginTop:12, display:"flex", alignItems:"center", gap:8, fontSize:13, color:C.primary, fontWeight:500 }}>
                <span>📌</span> Singapore Green View Township, Vijay Nagar, Indore
              </div>
            </div>

          </div>
        </Reveal>
      </div>

    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   AI TOOLS
══════════════════════════════════════════════════════════════════════ */
function AISection() {
  const tools = [
    { icon:"🩺", color:C.primary, bg:C.light,   title:"Symptom Checker",   desc:"Describe your symptoms in natural language and get an AI-powered assessment and doctor recommendation instantly." },
    { icon:"📄", color:C.blue,    bg:"#EFF6FF",  title:"Report Simplifier", desc:"Upload your medical reports and receive plain-language explanations — no confusing medical jargon." },
    { icon:"🏥", color:C.orange,  bg:"#FFF7ED",  title:"Hospital Navigator", desc:"Find the right department, get directions, understand procedures — AI-guided hospital navigation for Indore." },
  ];

  return (
    <section id="ai" style={{ padding:"80px 24px", background:C.bg }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <div className="section-label">🤖 AI Assistant</div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#DCFCE7", color:"#166534", padding:"4px 14px", borderRadius:100, fontSize:11, fontWeight:700, letterSpacing:"0.5px", textTransform:"uppercase", marginBottom:12 }}>
              ● Now Live
            </div>
            <h2 style={{ fontSize:"clamp(26px,4vw,42px)", fontWeight:800, color:C.text, lineHeight:1.2, marginBottom:12 }}>
              AI-Powered Health Tools
            </h2>
            <p style={{ fontSize:16, color:C.muted, maxWidth:460, margin:"0 auto" }}>
              Intelligent tools making healthcare accessible to everyone in Indore
            </p>
          </div>
        </Reveal>

        <div className="ai-grid">
          {tools.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="card" style={{ padding:"28px 24px", height:"100%", borderTop:`3px solid ${t.color}` }}>
                <div style={{ width:52, height:52, borderRadius:14, background:t.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, marginBottom:18, border:`1px solid ${t.color}22` }}>{t.icon}</div>
                <h3 style={{ fontSize:17, fontWeight:700, color:C.text, marginBottom:10 }}>{t.title}</h3>
                <p style={{ fontSize:14, color:C.muted, lineHeight:1.7 }}>{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div style={{ textAlign:"center", marginTop:40, padding:"24px", background:"#fff", borderRadius:16, border:`1px solid ${C.border}` }}>
            <div style={{ fontSize:14, color:C.muted, marginBottom:8 }}>💬 Try it now — click the chat button at the bottom right</div>
            <div style={{ fontSize:13, color:C.primary, fontWeight:600 }}>Ask about symptoms · Get doctor recommendations · Available 24/7</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background:"#0F172A", color:"#fff", padding:"60px 24px 28px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="footer-cols" style={{ marginBottom:48 }}>

          {/* Brand */}
          <div>
            <div style={{ background:"#fff", borderRadius:10, padding:"4px 10px", display:"inline-flex", marginBottom:18 }}>
              <img src={`${BASE}logo.png`} alt="Health Navigator" style={{ height:40, width:"auto", objectFit:"contain" }} />
            </div>
            <p style={{ fontSize:14, color:"#94A3B8", lineHeight:1.75, marginBottom:20, maxWidth:260 }}>
              Indore's trusted healthcare navigator — connecting patients with the right specialist in minutes.
            </p>
            <div style={{ display:"flex", gap:10 }}>
              {["📘","📸","🐦","▶️"].map((s,i) => (
                <div key={i} style={{ width:36, height:36, borderRadius:8, background:"rgba(255,255,255,0.07)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, cursor:"pointer" }}>{s}</div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ fontWeight:700, fontSize:14, color:"#fff", marginBottom:18, textTransform:"uppercase", letterSpacing:"0.5px" }}>Quick Links</div>
            {["Home","Find Doctors","AI Tools","How It Works","Location"].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`} style={{ display:"block", fontSize:14, color:"#94A3B8", textDecoration:"none", marginBottom:10, transition:"color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color="#fff")}
                onMouseLeave={e => (e.currentTarget.style.color="#94A3B8")}>{l}</a>
            ))}
          </div>

          {/* Specialties */}
          <div>
            <div style={{ fontWeight:700, fontSize:14, color:"#fff", marginBottom:18, textTransform:"uppercase", letterSpacing:"0.5px" }}>Specialties</div>
            {["Cardiologist","Neurologist","General Physician","Orthopedic","Dermatologist","Homeopathy"].map(s => (
              <div key={s} style={{ fontSize:14, color:"#94A3B8", marginBottom:10 }}>{s}</div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontWeight:700, fontSize:14, color:"#fff", marginBottom:18, textTransform:"uppercase", letterSpacing:"0.5px" }}>Contact Us</div>
            {[
              { icon:"📞", val:"+91 97536 32223" },
              { icon:"📍", val:"Vijay Nagar, Indore, MP" },
              { icon:"🕐", val:"Mon–Sat, 9AM–7PM" },
              { icon:"✉️", val:"info@medguide.in" },
            ].map(r => (
              <div key={r.icon} style={{ display:"flex", gap:10, marginBottom:14, alignItems:"flex-start" }}>
                <span style={{ fontSize:14, marginTop:1 }}>{r.icon}</span>
                <span style={{ fontSize:14, color:"#94A3B8", lineHeight:1.5 }}>{r.val}</span>
              </div>
            ))}
            <a href="tel:+919753632223" style={{ textDecoration:"none", marginTop:4, display:"block" }}>
              <button className="btn-primary" style={{ fontSize:13, padding:"10px 20px" }}>Book Appointment</button>
            </a>
          </div>
        </div>

        <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <p style={{ fontSize:13, color:"#64748B" }}>© 2026 MedGuide · Health Navigator. All rights reserved.</p>
          <p style={{ fontSize:13, color:"#64748B" }}>Serving Indore with trusted healthcare navigation</p>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   CHAT WIDGET
══════════════════════════════════════════════════════════════════════ */
type Msg = { role:"user"|"assistant"; content:string };

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role:"assistant", content:"👋 Hi! I'm MedGuide AI. Tell me your symptoms and I'll help you find the right doctor in Indore." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Msg = { role:"user", content:text };
    const history = [...msgs, userMsg];
    setMsgs(history); setInput(""); setLoading(true);
    try {
      const res = await fetch("/api/chat", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ messages: history }) });
      const data = await res.json() as { reply?:string; error?:string };
      setMsgs(prev => [...prev, { role:"assistant", content: data.reply ?? data.error ?? "Sorry, something went wrong." }]);
    } catch {
      setMsgs(prev => [...prev, { role:"assistant", content:"Connection error. Please try again." }]);
    } finally { setLoading(false); }
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      {/* FAB */}
      <button className="chat-fab" onClick={() => setOpen(o => !o)} aria-label="AI chat"
        style={{ position:"fixed", bottom:28, right:28, zIndex:2000, width:58, height:58, borderRadius:"50%",
          background:`linear-gradient(135deg, ${C.primary}, #0A5C41)`,
          border:"3px solid rgba(255,255,255,0.3)", cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, color:"#fff",
          transition:"transform 0.2s", transform: open ? "scale(0.9) rotate(8deg)" : "scale(1)" }}>
        {open ? "✕" : "🩺"}
      </button>

      {open && (
        <div className="chat-open" style={{
          position:"fixed", bottom:100, right:28, zIndex:1999,
          width:"min(370px, calc(100vw - 36px))",
          background:"#fff", borderRadius:20,
          boxShadow:"0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)",
          border:`1px solid ${C.border}`,
          display:"flex", flexDirection:"column", overflow:"hidden",
          maxHeight:"min(520px, calc(100svh - 150px))",
        }}>
          {/* Header */}
          <div style={{ background:`linear-gradient(135deg, ${C.primary}, #0A5C41)`, padding:"14px 18px", display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,0.15)", border:"2px solid rgba(255,255,255,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>🩺</div>
            <div>
              <div style={{ fontWeight:700, fontSize:15, color:"#fff" }}>MedGuide AI</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)" }}>Indore Doctor Finder</div>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:5 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"#4ADE80" }} />
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.7)" }}>Online</span>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:"auto", padding:"14px 14px 8px", display:"flex", flexDirection:"column", gap:10 }}>
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "chat-bubble-user" : "chat-bubble-assistant"} style={{ padding:"10px 14px", fontSize:14, lineHeight:1.55, maxWidth:"85%" }}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble-assistant" style={{ padding:"12px 14px" }}>
                <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding:"10px 12px 14px", borderTop:`1px solid ${C.border}`, display:"flex", gap:8, flexShrink:0 }}>
            <textarea className="chat-input" rows={1} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey} placeholder="Describe your symptoms…" />
            <button className="chat-send" onClick={send} disabled={loading || !input.trim()}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Navbar />
      <Hero />
      <div className="divider" />
      <HowItWorks />
      <div className="divider" />
      <DoctorsSection />
      <div className="divider" />
      <MapSection />
      <div className="divider" />
      <AISection />
      <Footer />
      <ChatWidget />
    </>
  );
}
