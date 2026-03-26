import { useState, useEffect } from "react";

const BASE = import.meta.env.BASE_URL;

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "#hero" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Our Doctors", href: "#doctors" },
    { label: "Location", href: "#location" },
    { label: "AI Features", href: "#ai" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: scrolled ? "rgba(247,243,238,0.97)" : "#f7f3ee",
        boxShadow: scrolled ? "0 2px 20px rgba(13,31,26,0.10)" : "none",
        transition: "all 0.3s ease",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        <a href="#hero" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "38px",
                height: "38px",
                backgroundColor: "#1a6b4a",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#f7f3ee", fontSize: "18px" }}>✚</span>
            </div>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "26px",
                fontWeight: "700",
                color: "#0d1f1a",
                letterSpacing: "-0.5px",
              }}
            >
              MedGuide
            </span>
          </div>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden-mobile">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{
                textDecoration: "none",
                color: "#0d1f1a",
                fontSize: "15px",
                fontWeight: "500",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {link.label}
            </a>
          ))}
          <a href="tel:+919753632223" style={{ textDecoration: "none" }}>
            <button
              className="btn-hover"
              style={{
                backgroundColor: "#1a6b4a",
                color: "#f7f3ee",
                border: "none",
                padding: "10px 22px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Book Appointment
            </button>
          </a>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            color: "#0d1f1a",
            fontSize: "22px",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            backgroundColor: "#f7f3ee",
            padding: "16px 24px 20px",
            borderTop: "1px solid rgba(201,168,76,0.2)",
          }}
          className="mobile-menu"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                textDecoration: "none",
                color: "#0d1f1a",
                fontSize: "15px",
                fontWeight: "500",
                padding: "10px 0",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {link.label}
            </a>
          ))}
          <a href="tel:+919753632223" style={{ textDecoration: "none" }}>
            <button
              style={{
                backgroundColor: "#1a6b4a",
                color: "#f7f3ee",
                border: "none",
                padding: "12px 22px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                marginTop: "12px",
                width: "100%",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Book Appointment
            </button>
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

function Hero() {
  const stats = [
    { value: "50+", label: "Doctors" },
    { value: "98%", label: "Satisfaction" },
    { value: "5 min", label: "Match" },
    { value: "24/7", label: "AI Support" },
  ];

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #0d1f1a 0%, #1a6b4a 55%, #1f7d55 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          backgroundColor: "rgba(201,168,76,0.06)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          backgroundColor: "rgba(247,243,238,0.04)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "780px" }}>
        <div
          className="fade-up"
          style={{
            display: "inline-block",
            backgroundColor: "rgba(201,168,76,0.15)",
            border: "1px solid rgba(201,168,76,0.35)",
            color: "#c9a84c",
            padding: "6px 18px",
            borderRadius: "100px",
            fontSize: "13px",
            fontWeight: "600",
            marginBottom: "28px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Indore's Premier Healthcare Navigator
        </div>

        <h1
          className="fade-up-delay-1"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(40px, 7vw, 74px)",
            fontWeight: "700",
            color: "#f7f3ee",
            lineHeight: "1.1",
            margin: "0 0 24px",
            letterSpacing: "-1px",
          }}
        >
          Find the Right Doctor,{" "}
          <em style={{ color: "#c9a84c", fontStyle: "italic" }}>Not Just Any Doctor</em>
        </h1>

        <p
          className="fade-up-delay-2"
          style={{
            fontSize: "17px",
            color: "rgba(247,243,238,0.80)",
            lineHeight: "1.7",
            margin: "0 0 40px",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          MedGuide connects Indore residents with the right specialist in minutes. 
          No guesswork, no referral delays — just expert care matched to your unique health needs.
        </p>

        <div
          className="fade-up-delay-3"
          style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "64px" }}
        >
          <a href="#doctors" style={{ textDecoration: "none" }}>
            <button
              className="btn-hover"
              style={{
                backgroundColor: "#c9a84c",
                color: "#0d1f1a",
                border: "none",
                padding: "14px 32px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "700",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Find My Doctor
            </button>
          </a>
          <a href="#how-it-works" style={{ textDecoration: "none" }}>
            <button
              style={{
                backgroundColor: "transparent",
                color: "#f7f3ee",
                border: "2px solid rgba(247,243,238,0.4)",
                padding: "14px 32px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={e => {
                (e.target as HTMLButtonElement).style.borderColor = "rgba(247,243,238,0.85)";
                (e.target as HTMLButtonElement).style.backgroundColor = "rgba(247,243,238,0.08)";
              }}
              onMouseLeave={e => {
                (e.target as HTMLButtonElement).style.borderColor = "rgba(247,243,238,0.4)";
                (e.target as HTMLButtonElement).style.backgroundColor = "transparent";
              }}
            >
              How It Works
            </button>
          </a>
        </div>

        <div
          className="fade-up-delay-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "rgba(247,243,238,0.07)",
                border: "1px solid rgba(247,243,238,0.12)",
                borderRadius: "12px",
                padding: "20px 16px",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "36px",
                  fontWeight: "700",
                  color: "#c9a84c",
                  lineHeight: "1",
                  marginBottom: "6px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(247,243,238,0.65)",
                  fontWeight: "500",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: "📋",
      title: "Describe Symptoms",
      desc: "Tell us what you're experiencing — in plain language. Our intelligent intake form captures the details that matter most.",
    },
    {
      num: "02",
      icon: "🎯",
      title: "Get Matched",
      desc: "Our matching engine analyzes your symptoms and connects you with the right specialist in Indore within minutes.",
    },
    {
      num: "03",
      icon: "📅",
      title: "Book & Visit",
      desc: "Instantly book a confirmed appointment with your matched doctor. Walk in confidently, knowing you're in the right hands.",
    },
  ];

  return (
    <section
      id="how-it-works"
      style={{
        padding: "100px 24px",
        backgroundColor: "#f7f3ee",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            style={{
              display: "inline-block",
              width: "48px",
              height: "3px",
              backgroundColor: "#c9a84c",
              borderRadius: "2px",
              marginBottom: "20px",
            }}
          />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: "700",
              color: "#0d1f1a",
              margin: "0 0 16px",
              lineHeight: "1.15",
            }}
          >
            How It Works
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#5a7a6e",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: "1.7",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Three simple steps to connect you with expert care in Indore
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="card-hover"
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                padding: "36px 28px",
                border: "1px solid rgba(201,168,76,0.15)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "20px",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "60px",
                  fontWeight: "700",
                  color: "rgba(26,107,74,0.07)",
                  lineHeight: "1",
                  pointerEvents: "none",
                }}
              >
                {step.num}
              </div>

              <div
                style={{
                  width: "56px",
                  height: "56px",
                  backgroundColor: "rgba(26,107,74,0.08)",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  marginBottom: "20px",
                }}
              >
                {step.icon}
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "26px",
                  fontWeight: "700",
                  color: "#0d1f1a",
                  margin: "0 0 12px",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: "#5a7a6e",
                  lineHeight: "1.7",
                  margin: 0,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {step.desc}
              </p>

              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "linear-gradient(to right, #1a6b4a, #c9a84c)",
                  borderRadius: "0 0 16px 16px",
                  opacity: 0.6,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #how-it-works .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function DoctorCard() {
  return (
    <section
      id="doctors"
      style={{
        padding: "100px 24px",
        background: "linear-gradient(180deg, #eee8e0 0%, #f7f3ee 100%)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            style={{
              display: "inline-block",
              width: "48px",
              height: "3px",
              backgroundColor: "#c9a84c",
              borderRadius: "2px",
              marginBottom: "20px",
            }}
          />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: "700",
              color: "#0d1f1a",
              margin: "0 0 16px",
              lineHeight: "1.15",
            }}
          >
            Featured Doctor
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#5a7a6e",
              maxWidth: "460px",
              margin: "0 auto",
              lineHeight: "1.7",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Trusted specialists hand-picked for their expertise and patient care
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="card-hover"
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(201,168,76,0.2)",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 8px 30px rgba(13,31,26,0.08)",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #1a6b4a 0%, #0d1f1a 100%)",
                padding: "40px 28px 28px",
                textAlign: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: "radial-gradient(circle at 30% 20%, rgba(201,168,76,0.15) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  width: "130px",
                  height: "130px",
                  borderRadius: "50%",
                  border: "4px solid #c9a84c",
                  overflow: "hidden",
                  margin: "0 auto 20px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <img
                  src={`${BASE}dr-jagrati-yadav.png`}
                  alt="Dr. Jagrati Yadav"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#f7f3ee",
                  margin: "0 0 6px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Dr. Jagrati Yadav
              </h3>
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "rgba(201,168,76,0.18)",
                  border: "1px solid rgba(201,168,76,0.4)",
                  color: "#c9a84c",
                  padding: "4px 14px",
                  borderRadius: "100px",
                  fontSize: "13px",
                  fontWeight: "600",
                  fontFamily: "'DM Sans', sans-serif",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Homeopathy Doctor
              </div>
            </div>

            <div style={{ padding: "28px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "rgba(26,107,74,0.08)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: "16px",
                    }}
                  >
                    📍
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#9ab0a8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "3px", fontFamily: "'DM Sans', sans-serif" }}>
                      Address
                    </div>
                    <div style={{ fontSize: "14px", color: "#0d1f1a", lineHeight: "1.5", fontFamily: "'DM Sans', sans-serif" }}>
                      N-100, Singapore Green View, Vijay Nagar, Indore, MP
                    </div>
                  </div>
                </div>

                <div style={{ height: "1px", backgroundColor: "rgba(201,168,76,0.1)" }} />

                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "rgba(26,107,74,0.08)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: "16px",
                    }}
                  >
                    📞
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#9ab0a8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "3px", fontFamily: "'DM Sans', sans-serif" }}>
                      Phone
                    </div>
                    <a
                      href="tel:+919753632223"
                      style={{
                        fontSize: "15px",
                        color: "#1a6b4a",
                        fontWeight: "600",
                        textDecoration: "none",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      +91 97536 32223
                    </a>
                  </div>
                </div>

                <div style={{ height: "1px", backgroundColor: "rgba(201,168,76,0.1)" }} />

                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "rgba(26,107,74,0.08)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: "16px",
                    }}
                  >
                    🕐
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#9ab0a8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "3px", fontFamily: "'DM Sans', sans-serif" }}>
                      Hours
                    </div>
                    <div style={{ fontSize: "14px", color: "#0d1f1a", fontFamily: "'DM Sans', sans-serif" }}>
                      Mon – Sat, 9:00 AM – 7:00 PM
                    </div>
                  </div>
                </div>
              </div>

              <a href="tel:+919753632223" style={{ textDecoration: "none", display: "block", marginTop: "24px" }}>
                <button
                  className="btn-hover"
                  style={{
                    width: "100%",
                    backgroundColor: "#1a6b4a",
                    color: "#f7f3ee",
                    border: "none",
                    padding: "14px",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: "700",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.2px",
                  }}
                >
                  📞 Call to Book Appointment
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section
      id="location"
      style={{
        padding: "80px 24px",
        backgroundColor: "#f7f3ee",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-block",
              width: "48px",
              height: "3px",
              backgroundColor: "#c9a84c",
              borderRadius: "2px",
              marginBottom: "20px",
            }}
          />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px, 5vw, 50px)",
              fontWeight: "700",
              color: "#0d1f1a",
              margin: "0 0 12px",
            }}
          >
            Find the Clinic
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "#5a7a6e",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Singapore Green View Township, Vijay Nagar, Indore
          </p>
        </div>

        <div
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(201,168,76,0.2)",
            boxShadow: "0 8px 30px rgba(13,31,26,0.10)",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.5!2d75.905614!3d22.800864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963849d2b1b6e97%3A0xe5d96adbc9d9a3bb!2sSINGAPORE%20GREEN%20VIEW%20TOWNSHIP!5e0!3m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Dr. Jagrati Yadav Clinic Location"
          />
        </div>
      </div>
    </section>
  );
}

function AISection() {
  const features = [
    {
      icon: "🩺",
      title: "Symptom Checker",
      desc: "Describe your symptoms in natural language and get an AI-powered preliminary assessment before visiting a doctor.",
    },
    {
      icon: "📄",
      title: "Report Simplifier",
      desc: "Upload your medical reports and get clear, simple explanations of your test results without medical jargon.",
    },
    {
      icon: "🏥",
      title: "Hospital Guide",
      desc: "Navigate Indore's hospitals with AI — find the right department, get directions, and understand procedures.",
    },
  ];

  return (
    <section
      id="ai"
      style={{
        padding: "100px 24px",
        background: "linear-gradient(135deg, #0d1f1a 0%, #1a6b4a 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(ellipse at 70% 30%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(247,243,238,0.04) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(201,168,76,0.15)",
              border: "1px solid rgba(201,168,76,0.3)",
              color: "#c9a84c",
              padding: "5px 16px",
              borderRadius: "100px",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: "20px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Coming Soon
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: "700",
              color: "#f7f3ee",
              margin: "0 0 16px",
              lineHeight: "1.15",
            }}
          >
            AI-Powered Health Tools
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(247,243,238,0.65)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: "1.7",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            The next generation of healthcare navigation is almost here — 
            intelligent tools that make healthcare accessible to everyone in Indore.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          {features.map((feat, i) => (
            <div
              key={i}
              className="card-hover"
              style={{
                backgroundColor: "rgba(247,243,238,0.05)",
                border: "1px solid rgba(247,243,238,0.10)",
                borderRadius: "16px",
                padding: "32px 24px",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  fontSize: "36px",
                  marginBottom: "16px",
                }}
              >
                {feat.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#f7f3ee",
                  margin: "0 0 10px",
                }}
              >
                {feat.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(247,243,238,0.60)",
                  lineHeight: "1.7",
                  margin: 0,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            className="gold-btn-hover"
            style={{
              backgroundColor: "#c9a84c",
              color: "#0d1f1a",
              border: "none",
              padding: "14px 36px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onClick={() => alert("You'll be notified when AI features launch!")}
          >
            Notify Me When It Launches
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #ai .ai-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0d1f1a",
        color: "rgba(247,243,238,0.60)",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#1a6b4a",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#f7f3ee", fontSize: "14px" }}>✚</span>
          </div>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "20px",
              fontWeight: "700",
              color: "#f7f3ee",
            }}
          >
            MedGuide
          </span>
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "14px", fontFamily: "'DM Sans', sans-serif" }}>
            © 2026 MedGuide. All rights reserved. Indore's trusted healthcare navigator.
          </p>
        </div>

        <div>
          <a
            href="tel:+919753632223"
            style={{
              color: "#c9a84c",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: "600",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            +91 97536 32223
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <HowItWorks />
      <div className="section-divider" />
      <DoctorCard />
      <MapSection />
      <AISection />
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          #how-it-works > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #ai > div > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
