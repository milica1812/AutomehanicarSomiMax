import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

function AutoServisLazarMaksimovic() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState({
    service: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const heroImages = [
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1400&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "phone") {
      newValue = value.replace(/\D/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name !== "message") {
      setErrors((prev) => ({
        ...prev,
        [name]: newValue.trim().length < 3,
      }));
    }

    setFormError("");
  }

  function validateForm() {
    const newErrors = {
      name: formData.name.trim().length < 3,
      phone: formData.phone.trim().length < 3,
      service: formData.service.trim().length < 3,
    };

    setErrors(newErrors);

    const hasErrors = newErrors.name || newErrors.phone || newErrors.service;

    if (hasErrors) {
      setFormError("Molimo popunite sva obavezna polja.");
      return false;
    }

    setFormError("");
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return; // ako forma nije validna, prekida se
    }

    sendEmail(); // ako je sve validno, šalje se email
  }

  function sendEmail() {
    emailjs
      .send(
        "service_zypfb39",
        "template_m7lkuxc",
        {
          name: formData.name,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        },
        "zRzFrV1V1enIHyPvz",
      )
      .then(() => {
        setShowSuccess(true);
        setFormData({
          name: "",
          phone: "",
          service: "",
          message: "",
        });
        setErrors({});
      })
      .catch((error) => {
        console.error("EMAIL GRESKA:", error);
        alert(
          "Greška: " + (error?.text || error?.message || "Slanje nije uspelo."),
        );
      });
  }

  const services = [
    {
      icon: "🔧",
      title: "Mali i veliki servis",
      text: "Redovno održavanje vozila uz pažljiv pregled i pouzdanu ugradnju delova.",
    },
    {
      icon: "🛞",
      title: "Trap i kočnice",
      text: "Provera stabilnosti, kočionog sistema i delova koji utiču na bezbednu vožnju.",
    },
    {
      icon: "🛢️",
      title: "Zamena ulja i filtera",
      text: "Brza i precizna zamena potrošnog materijala za siguran rad motora.",
    },
    {
      icon: "💻",
      title: "Dijagnostika vozila",
      text: "Otkrivanje grešaka i jasan savet šta je potrebno uraditi na vozilu.",
    },
    {
      icon: "🚗",
      title: "Priprema za tehnički",
      text: "Detaljna kontrola vozila kako biste spremno izašli na tehnički pregled.",
    },
    {
      icon: "⚙️",
      title: "Brze intervencije",
      text: "Za hitne sitne kvarove, proveru automobila i savet pre dužeg puta.",
    },
  ];

  const stats = [
    { value: "10+", label: "vrsta usluga" },
    { value: "100%", label: "posvećen rad" },
    { value: "Lokalno", label: "u Mataruškoj Banji" },
  ];

  const testimonials = [
    {
      name: "Milan P.",
      avatar: "👨",
      text: "Brz dogovor, korektan pristup i sve jasno objašnjeno. Servis za svaku preporuku.",
    },
    {
      name: "Jelena S.",
      avatar: "👩",
      text: "Auto je bio gotov na vreme, a unapred sam znala šta se radi i kolika je cena.",
    },
    {
      name: "Nikola R.",
      avatar: "🧔",
      text: "Odličan servis za redovno održavanje i proveru vozila pred duži put.",
    },
  ];

  return (
    <div className="page">
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; font-family: Arial, Helvetica, sans-serif; background: #0b1220; }
        .page {
          min-height: 100vh;
          color: #e5e7eb;
          background:
            radial-gradient(circle at top left, rgba(220,38,38,0.18), transparent 30%),
            radial-gradient(circle at top right, rgba(59,130,246,0.12), transparent 28%),
            linear-gradient(180deg, #0b1220 0%, #111827 38%, #f8fafc 38%, #f8fafc 100%);
        }
        .container {
          width: min(1180px, calc(100% - 32px));
          margin: 0 auto;
        }
        .nav {
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(14px);
          background: rgba(11, 18, 32, 0.72);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 0;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          color: white;
        }
        .brand-badge {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #dc2626, #f97316);
          box-shadow: 0 10px 24px rgba(220,38,38,0.3);
          font-size: 22px;
        }
        .nav-links {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
        }
        .nav-links a {
          color: #cbd5e1;
          text-decoration: none;
          font-size: 14px;
        }
        .nav-links a:hover { color: white; }
        .hero {
          padding: 34px 0 70px;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          gap: 28px;
          align-items: center;
        }
        .hero-copy {
          padding: 24px 0;
        }
        .mini-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          color: #f8fafc;
          padding: 10px 16px;
          border-radius: 999px;
          font-size: 13px;
          margin-bottom: 18px;
        }
        .hero h1 {
          margin: 0;
          font-size: clamp(34px, 7vw, 66px);
          line-height: 0.98;
          letter-spacing: -1.4px;
          color: white;
        }
        .hero p {
          font-size: 18px;
          line-height: 1.75;
          color: #cbd5e1;
          max-width: 620px;
          margin: 20px 0 0;
        }
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 28px;
        }
        .btn {
          text-decoration: none;
          border-radius: 16px;
          padding: 14px 22px;
          font-weight: 700;
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .btn:hover { transform: translateY(-2px); }
        .btn-primary {
          background: linear-gradient(135deg, #dc2626, #f97316);
          color: white;
          box-shadow: 0 14px 30px rgba(220,38,38,0.32);
        }
        .btn-secondary {
          color: white;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
        }
        .hero-side {
          position: relative;
          min-height: 510px;
        }
        .glow {
          position: absolute;
          inset: auto 10% -5% auto;
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(249,115,22,0.45), transparent 65%);
          filter: blur(20px);
          z-index: 0;
          pointer-events: none;
        }
        .photo-card {
          position: relative;
          height: 100%;
          min-height: 510px;
          border-radius: 30px;
          overflow: hidden;
          background: #111827;
          box-shadow: 0 26px 60px rgba(0,0,0,0.35);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .slide-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transform: scale(1.08);
          transition: opacity .8s ease, transform 4s ease;
        }
        .slide-image.active {
          opacity: 1;
          transform: scale(1);
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15,23,42,0.08), rgba(15,23,42,0.78));
        }
        .floating-card {
          position: absolute;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.16);
          backdrop-filter: blur(14px);
          border-radius: 20px;
          padding: 16px 18px;
          color: white;
          box-shadow: 0 12px 24px rgba(0,0,0,0.2);
          animation: floatY 3.2s ease-in-out infinite;
        }
        .floating-top { top: 18px; left: 18px; }
        .floating-bottom { right: 18px; bottom: 18px; animation-delay: .8s; }
        .floating-card strong { display: block; margin-bottom: 4px; }
        .dots {
          position: absolute;
          left: 22px;
          bottom: 22px;
          display: flex;
          gap: 8px;
          z-index: 3;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.38);
        }
        .dot.active { background: white; }
        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 28px;
        }
        .stat {
          padding: 18px;
          border-radius: 20px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .stat-value {
          font-size: 28px;
          color: white;
          font-weight: 800;
          margin-bottom: 6px;
        }
        .section {
          padding: 78px 0;
        }
        .section-light { color: #0f172a; }
        .kicker {
          display: inline-block;
          color: #dc2626;
          text-transform: uppercase;
          letter-spacing: 2.4px;
          font-weight: 800;
          font-size: 12px;
          margin-bottom: 12px;
        }
        .section-title {
          color: #717c8dff;
          margin: 0;
          font-size: clamp(28px, 5vw, 42px);
          line-height: 1.1;
        }
        .section-sub {
          margin-top: 14px;
          max-width: 760px;
          color: #50688aff;
          line-height: 1.75;
          font-size: 17px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 34px;
            margin-bottom: 80px;

        }
        .service-card {
          position: relative;
          overflow: hidden;
          border-radius: 26px;
          background: white;
          padding: 24px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 12px 30px rgba(15,23,42,0.06);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(15,23,42,0.12);
        }
        .service-card::after {
          content: "";
          position: absolute;
          inset: auto -30px -30px auto;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(239,68,68,0.12), transparent 70%);
        }
        .service-icon {
          width: 62px;
          height: 62px;
          border-radius: 18px;
          display: grid;
          place-items: center;
          font-size: 28px;
          background: linear-gradient(135deg, #fee2e2, #ffedd5);
          margin-bottom: 16px;
        }
        .service-card h3 {
          margin: 0 0 10px;
          font-size: 21px;
          color: #0f172a;
        }
        .service-card p {
          margin: 0;
          color: #475569;
          line-height: 1.7;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 24px;
          margin-top: 36px;
        }
        .panel {
          border-radius: 28px;
          overflow: hidden;
          background: white;
          border: 1px solid #e2e8f0;
          box-shadow: 0 16px 40px rgba(15,23,42,0.08);
        }
        .photo-panel {
          min-height: 420px;
          position: relative;
          background-image: linear-gradient(180deg, rgba(15,23,42,0.05), rgba(15,23,42,0.55)), url("https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=80");
          background-size: cover;
          background-position: center;
        }
        .photo-panel-content {
          position: absolute;
          inset: auto 22px 22px 22px;
          padding: 18px;
          border-radius: 20px;
          background: rgba(15,23,42,0.6);
          color: white;
          backdrop-filter: blur(8px);
        }
        .list-panel {
          padding: 28px;
          color: #0f172a;
        }
        .feature-list {
          display: grid;
          gap: 16px;
          margin-top: 22px;
        }
        .feature-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          padding: 16px;
          border-radius: 18px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        }
        .check {
          width: 28px;
          height: 28px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #dc2626, #f97316);
          color: white;
          flex: 0 0 auto;
          font-weight: 700;
        }
        .testimonials {
          margin-top: 34px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .testimonial {
          background: #0f172a;
          color: #e2e8f0;
          border-radius: 24px;
          padding: 22px;
          box-shadow: 0 16px 34px rgba(15,23,42,0.18);
        }
        .testimonial-top {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }
        .avatar {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          font-size: 28px;
          background: linear-gradient(135deg, #1e293b, #334155);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 22px;
          margin-top: 34px;
        }
        .contact-card {
          background: linear-gradient(180deg, #111827, #0f172a);
          color: white;
          border-radius: 28px;
          padding: 28px;
          box-shadow: 0 20px 44px rgba(15,23,42,0.22);
        }
        .contact-lines {
          display: grid;
          gap: 14px;
          margin-top: 24px;
        }
        .contact-line {
          padding: 14px 16px;
          border-radius: 18px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .form-card {
          background: white;
          border-radius: 28px;
          padding: 28px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 16px 36px rgba(15,23,42,0.08);
          color: #0f172a;
        }
        .input-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          row-gap: 16px;
        }
        .input {
          margin-top: 16px;
        }
        .input,
        .textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #cbd5e1;
          border-radius: 16px;
          padding: 14px 16px;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
        }
        .input:focus,
        .textarea:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
        }
          .input-error {
          border-color: #ef4444 !important;
          background: #fff5f5;
        }
          .input-error:focus {
          border-color: #ef4444 !important;
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.12);
        }
        .textarea {
          resize: vertical;
          min-height: 140px;
          margin-top: 14px;
          font-family: inherit;
        }
        .submit {
          margin-top: 14px;
          border: none;
          background: linear-gradient(135deg, #dc2626, #f97316);
          color: white;
          padding: 15px 22px;
          border-radius: 16px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 12px 28px rgba(220,38,38,0.24);
        }
        .map-box {
          margin-top: 20px;
          min-height: 170px;
          border-radius: 20px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: end;
        }
        .map-badge {
          margin: 14px;
          padding: 12px 14px;
          border-radius: 16px;
          backdrop-filter: blur(8px);
          color: white;
          font-size: 14px;
        }
        .footer {
          padding: 24px 0 34px;
          color: #64748b;
          text-align: center;
        }
       .phone-link {
          color: #ff6a00;
          font-weight: 600;
          text-decoration: none;
        }

        .phone-link:hover {
          text-decoration: underline;
        }

        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @media (max-width: 980px) {
          .hero-grid,
          .about-grid,
          .contact-grid,
          .services-grid,
          .testimonials {
            grid-template-columns: 1fr 1fr;
          }
          .hero-grid,
          .about-grid,
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .hero-side,
          .photo-card { min-height: 420px; }
        }
        @media (max-width: 720px) {
          .nav-inner {
            flex-direction: column;
            align-items: flex-start;
          }
          .nav-links {
            gap: 12px;
          }
          .services-grid,
          .testimonials,
          .stats,
          .input-grid {
            grid-template-columns: 1fr;
          }
          .hero { padding-top: 22px; }
          .hero p { font-size: 16px; }
          .photo-card,
          .hero-side { min-height: 340px; }
          .section { padding: 60px 0; }
          .floating-top { top: 12px; left: 12px; }
          .floating-bottom { right: 12px; bottom: 46px; }
        }
          .popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  width: 320px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.popup h3 {
  margin-top: 0;
  color: #1f7a1f;
}

.popup button {
  margin-top: 15px;
  padding: 10px 20px;
  border: none;
  background: #ff6b2c;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

      `}</style>

      <nav className="nav">
        <div className="container nav-inner">
          <div className="brand">
            <div className="brand-badge">🚘</div>
            <div>
              <div>Auto servis - ŠOMI MAX</div>
              <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>
                Mataruška Banja
              </div>
            </div>
          </div>

          <div className="nav-links">
            <a href="#usluge">Usluge</a>
            <a href="#o-nama">O nama</a>
            <a href="#utisci">Utisci</a>
            <a href="#kontakt">Kontakt</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="mini-tag">
              🔩 Pouzdan autoservis za redovno održavanje i popravke
            </div>
            <h1>Moderan i profesionalan servis za vaše vozilo</h1>
            <p>
              Auto servis u Mataruškoj Banji, vlasnik Lazar Maksimović. Stranica
              je stilizovana kao pravi promotivni sajt: sa fotografijama,
              animacijama, karticama usluga i responzivnim prikazom za telefon,
              tablet i računar.
            </p>

            <div className="actions">
              <a className="btn btn-primary" href="#kontakt">
                📞 Zakaži termin
              </a>
              <a className="btn btn-secondary" href="#usluge">
                🔧 Pogledaj usluge
              </a>
            </div>

            <div className="stats">
              {stats.map((item) => (
                <div className="stat" key={item.label}>
                  <div className="stat-value">{item.value}</div>
                  <div style={{ color: "#cbd5e1", fontSize: 14 }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-side">
            <div className="glow" />
            <div className="photo-card">
              {heroImages.map((image, index) => (
                <div
                  key={image}
                  className={`slide-image ${index === activeIndex ? "active" : ""}`}
                  style={{ backgroundImage: `url(${image})` }}
                />
              ))}
              <div className="overlay" />

              <div className="floating-card floating-top">
                <strong>Radno vreme</strong>
                <div>Pon–Pet 08:00–17:00</div>
                <div>Sub 08:00–14:00</div>
              </div>

              <div className="floating-card floating-bottom">
                <strong>Kontakt</strong>
                📞{" "}
                <a href="tel:0628637932" className="phone-link">
                  062/8637932
                </a>
              </div>

              <div className="dots">
                {heroImages.map((_, index) => (
                  <div
                    key={index}
                    className={`dot ${index === activeIndex ? "active" : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="usluge" className="section section-light">
        <div className="container">
          <div className="kicker">Usluge</div>
          <h2 className="section-title">
            Sve što jednom vozaču treba na jednom mestu
          </h2>
          <div className="section-sub">
            U našem servisu možete obaviti sve osnovne popravke i održavanje
            vozila na jednom mestu. Dugogodišnje iskustvo, kvalitetni delovi i
            pažljiv pristup svakom automobilu garantuju pouzdan i bezbedan rad
            vašeg vozila.
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div className="service-card" key={service.title}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="o-nama"
        className="section section-light"
        style={{ paddingTop: 0 }}
      >
        <div className="container">
          <div className="about-grid">
            <div className="panel photo-panel">
              <div className="photo-panel-content">
                <div
                  style={{
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    color: "#fca5a5",
                    marginBottom: 8,
                  }}
                >
                  POUZDAN AUTO SERVIS
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
                  Stručan pregled, kvalitetan rad i fer dogovor
                </div>
                <div style={{ lineHeight: 1.7, color: "#e2e8f0" }}>
                  Redovno održavanje, dijagnostika i popravke vozila u
                  Mataruškoj Banji.
                </div>
              </div>
            </div>

            <div className="panel list-panel">
              <div className="kicker">ZAŠTO IZABRATI NAŠ SERVIS</div>
              <h2 className="section-title">
                Pouzdan servis i kvalitetna briga o vašem vozilu
              </h2>

              <div className="feature-list">
                <div className="feature-item">
                  <div className="check">✓</div>
                  <div>
                    <strong>Stručan i pouzdan rad</strong>
                    <div style={{ color: "#475569", marginTop: 6 }}>
                      Svako vozilo prolazi detaljan pregled kako bi se pronašao
                      uzrok problema i obavila kvalitetna popravka.
                    </div>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="check">✓</div>
                  <div>
                    <strong>Brza dijagnostika</strong>
                    <div style={{ color: "#475569", marginTop: 6 }}>
                      Savremena dijagnostika omogućava brzo otkrivanje grešaka i
                      efikasno rešavanje kvarova na vozilu.
                    </div>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="check">✓</div>
                  <div>
                    <strong>Kvalitetni delovi i oprema</strong>
                    <div style={{ color: "#475569", marginTop: 6 }}>
                      U radu se koriste provereni delovi i profesionalna oprema
                      kako bi vaše vozilo bilo sigurno i pouzdano.
                    </div>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="check">✓</div>
                  <div>
                    <strong>Fer odnos prema klijentima</strong>
                    <div style={{ color: "#475569", marginTop: 6 }}>
                      Pre svake popravke dobijate jasno objašnjenje šta je
                      potrebno uraditi i kolika će biti cena.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="utisci" className="section section-light">
        <div className="container">
          <div className="kicker">UTISCI KLIJENATA</div>
          <h2 className="section-title">Šta naši klijenti kažu o servisu</h2>
          <div className="section-sub">
            Zadovoljstvo klijenata nam je najvažnije. Ovo su iskustva vozača
            koji su servisirali svoja vozila u našem autoservisu u Mataruškoj
            Banji.
          </div>

          <div className="testimonials">
            {testimonials.map((item) => (
              <div className="testimonial" key={item.name}>
                <div className="testimonial-top">
                  <div className="avatar">{item.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 800, color: "white" }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 13, color: "#94a3b8" }}>
                      Zadovoljan klijent
                    </div>
                  </div>
                </div>
                <div style={{ lineHeight: 1.75 }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="section section-light">
        <div className="container">
          <div className="kicker">Kontakt</div>
          <h2 className="section-title">Zakažite termin ili pošaljite upit</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <h3 style={{ marginTop: 0, fontSize: 30 }}>
                Auto servis ŠOMI MAX
              </h3>

              <div className="contact-lines">
                <div className="contact-line">
                  <strong>Vlasnik:</strong> Lazar Maksimović
                </div>
                <div className="contact-line">
                  <strong>Lokacija:</strong> Mataruška Banja
                </div>
                <div className="contact-line">
                  <strong>📞 Telefon:</strong>{" "}
                  <a href="tel:0628637932" className="phone-link">
                    062/8637932
                  </a>
                </div>
                <div className="contact-line">
                  <strong>Adresa:</strong> Hajduk Veljkova 10, Mataruška Banja
                </div>
              </div>

              <div className="map-box">
                <div className="map-badge">
                  <iframe
                    src="https://www.google.com/maps?q=43.68830,20.61375&z=16&output=embed"
                    width="100%"
                    height="250"
                    style={{ border: 0, borderRadius: "16px" }}
                    loading="lazy"
                  />
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=43.68830,20.61375"
                    target="_blank"
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    📍 Pokreni navigaciju
                  </a>
                </div>
              </div>
            </div>

            <div className="form-card">
              <h3 style={{ marginTop: 0, fontSize: 30 }}>Pošaljite poruku</h3>
              <div className="input-grid">
                <input
                  type="text"
                  name="name"
                  placeholder="Vaše ime *"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input ${errors.name ? "input-error" : ""}`}
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Broj telefona *"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`input ${errors.phone ? "input-error" : ""}`}
                />
              </div>

              <input
                type="text"
                name="service"
                placeholder="Vrsta usluge *"
                value={formData.service}
                onChange={handleChange}
                className={`input ${errors.service ? "input-error" : ""}`}
              />

              <textarea
                className="textarea"
                name="message"
                placeholder="Opišite problem ili uslugu koja vam je potrebna"
                value={formData.message}
                onChange={handleChange}
              />

              <button className="submit" type="submit" onClick={handleSubmit}>
                Pošalji upit
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer container">
        © 2026 Auto servis ŠOMI MAX - Sva prava zadržana.
      </footer>
      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Uspešno!</h3>
            <p>Vaš upit je uspešno poslat.</p>
            <button onClick={() => setShowSuccess(false)}>U redu</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AutoServisLazarMaksimovic;
