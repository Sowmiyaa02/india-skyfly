import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroGlobe from "@/assets/hero-globe.jpg";
import skyflyLogo from "@/assets/skyfly-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkyFly International — Your Global Journey Starts With SkyFly" },
      {
        name: "description",
        content:
          "Professional overseas documentation & global visa guidance consultancy based in Trichy, India. 5,000+ happy clients across 29+ countries.",
      },
      { property: "og:title", content: "SkyFly International — Your Global Journey Starts With SkyFly" },
      {
        property: "og:description",
        content:
          "Professional overseas documentation & global visa guidance. 5,000+ clients, 29+ countries, 8+ years of expert guidance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ------------------------------------------------------------------ */
/* Cursor spotlight                                                   */
/* ------------------------------------------------------------------ */
function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-30 size-[500px] rounded-full opacity-40 mix-blend-screen will-change-transform"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--neon-cyan) 35%, transparent) 0%, transparent 60%)",
      }}
    />
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setP(scrolled * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 z-[60] h-[3px] w-full bg-transparent">
      <div
        className="h-full transition-[width] duration-150"
        style={{
          width: `${p}%`,
          background: "var(--gradient-aurora)",
          boxShadow: "var(--shadow-glow-electric)",
        }}
      />
    </div>
  );
}

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1800;
            const t0 = performance.now();
            const tick = (t: number) => {
              const k = Math.min(1, (t - t0) / duration);
              const eased = 1 - Math.pow(1 - k, 3);
              setVal(Math.round(end * eased));
              if (k < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShow(true)),
      { threshold: 0.15 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(28px)",
        filter: show ? "blur(0)" : "blur(6px)",
        transition: `opacity 0.9s ${delay}ms cubic-bezier(0.16,1,0.3,1), transform 0.9s ${delay}ms cubic-bezier(0.16,1,0.3,1), filter 0.9s ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function MagneticButton({
  children,
  className = "",
  variant = "primary",
  href,
  as = "button",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "whatsapp";
  href?: string;
  as?: "button" | "a";
}) {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = (ref.current as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    (ref.current as HTMLElement).style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };
  const onLeave = () => {
    if (ref.current) (ref.current as HTMLElement).style.transform = "translate(0,0)";
  };

  const base =
    "relative overflow-hidden rounded-2xl font-bold transition-transform duration-200 will-change-transform inline-flex items-center justify-center gap-2";
  const styles =
    variant === "primary"
      ? "px-8 py-4 text-base text-primary-foreground glow-electric"
      : variant === "whatsapp"
        ? "px-8 py-4 text-base text-white"
        : "px-8 py-4 text-base glass-panel hover:bg-white/10";
  const style =
    variant === "primary"
      ? { background: "var(--gradient-aurora)" }
      : variant === "whatsapp"
        ? { background: "linear-gradient(135deg, #25D366, #128C7E)" }
        : undefined;

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {variant !== "ghost" && (
        <span
          aria-hidden
          className="absolute inset-y-0 -left-1/3 w-1/3 animate-light-sweep bg-white/30 blur-md"
        />
      )}
    </>
  );

  if (as === "a" && href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`${base} ${styles} ${className}`}
        style={style}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${styles} ${className}`}
      style={style}
    >
      {inner}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Live floating visa approvals                                       */
/* ------------------------------------------------------------------ */
const NOTIFS = [
  { tag: "Visa Approved", text: "Germany Visitor Visa", color: "var(--neon-cyan)" },
  { tag: "Visa Approved", text: "France Tourist Visa", color: "var(--violet)" },
  { tag: "Visa Approved", text: "Spain Visitor Visa", color: "var(--sunset)" },
  { tag: "Visa Approved", text: "Portugal Visitor Visa", color: "var(--gold)" },
  { tag: "Visa Approved", text: "Netherlands Visitor Visa", color: "var(--electric)" },
  { tag: "Visa Approved", text: "Switzerland Visitor Visa", color: "var(--neon-cyan)" },
  { tag: "Consultation Booked", text: "Trichy Office — Just Now", color: "var(--violet)" },
];

function LiveNotifs() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % NOTIFS.length), 4200);
    return () => clearInterval(t);
  }, []);
  const n = NOTIFS[i];
  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-[320px]">
      <div
        key={i}
        className="glass-panel animate-notif flex items-center gap-3 rounded-2xl p-3 pr-6 shadow-2xl"
        style={{ borderColor: `color-mix(in oklab, ${n.color} 50%, transparent)` }}
      >
        <div
          className="grid size-10 shrink-0 place-items-center rounded-full"
          style={{ background: `color-mix(in oklab, ${n.color} 18%, transparent)`, color: n.color }}
        >
          ✓
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">{n.tag}</p>
          <p className="text-sm font-semibold">{n.text}</p>
        </div>
      </div>
    </div>
  );
}

function Particles() {
  const dots = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {dots.map((i) => {
        const colors = ["var(--electric)", "var(--violet)", "var(--neon-cyan)", "var(--sunset)", "var(--gold)"];
        const c = colors[i % colors.length];
        const size = 2 + (i % 4);
        return (
          <span
            key={i}
            className="absolute rounded-full opacity-70"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: size,
              height: size,
              background: c,
              boxShadow: `0 0 ${size * 4}px ${c}`,
              animation: `float-y ${4 + (i % 5)}s ease-in-out ${(i % 7) * 0.4}s infinite`,
            }}
          />
        );
      })}
      <span
        className="absolute top-[15%] left-[8%] h-px w-24 animate-shoot opacity-0"
        style={{ background: "linear-gradient(90deg, transparent, var(--neon-cyan))" }}
      />
      <span
        className="absolute top-[5%] left-[45%] h-px w-32 animate-shoot opacity-0"
        style={{ background: "linear-gradient(90deg, transparent, var(--sunset))", animationDelay: "2.5s" }}
      />
      <span
        className="absolute top-[35%] left-[70%] h-px w-28 animate-shoot opacity-0"
        style={{ background: "linear-gradient(90deg, transparent, var(--gold))", animationDelay: "4s" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sticky WhatsApp                                                    */
/* ------------------------------------------------------------------ */
function StickyWhatsApp() {
  return (
    <a
      href="https://wa.me/918098118198"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed right-6 bottom-6 z-50 grid size-16 place-items-center rounded-full text-3xl text-white shadow-2xl transition-transform hover:scale-110"
      style={{
        background: "linear-gradient(135deg, #25D366, #128C7E)",
        boxShadow: "0 0 32px rgba(37,211,102,0.55)",
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 animate-pulse-ring rounded-full"
        style={{ background: "#25D366" }}
      />
      <span className="relative">💬</span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */
const COUNTRIES = [
  { name: "Germany", flag: "🇩🇪", tag: "Visitor Visa", accent: "var(--violet)" },
  { name: "France", flag: "🇫🇷", tag: "Tourist Visa", accent: "var(--electric)" },
  { name: "Spain", flag: "🇪🇸", tag: "Visitor Visa", accent: "var(--sunset)" },
  { name: "Portugal", flag: "🇵🇹", tag: "Visitor Visa", accent: "var(--gold)" },
  { name: "Italy", flag: "🇮🇹", tag: "Tourist Visa", accent: "var(--sunset)" },
  { name: "Netherlands", flag: "🇳🇱", tag: "Visitor Visa", accent: "var(--neon-cyan)" },
  { name: "Belgium", flag: "🇧🇪", tag: "Schengen", accent: "var(--gold)" },
  { name: "Switzerland", flag: "🇨🇭", tag: "Visitor Visa", accent: "var(--electric)" },
  { name: "Austria", flag: "🇦🇹", tag: "Schengen", accent: "var(--violet)" },
  { name: "Poland", flag: "🇵🇱", tag: "Schengen", accent: "var(--neon-cyan)" },
  { name: "Denmark", flag: "🇩🇰", tag: "Schengen", accent: "var(--sunset)" },
  { name: "Sweden", flag: "🇸🇪", tag: "Schengen", accent: "var(--gold)" },
];

const SERVICES = [
  { icon: "📋", title: "Profile Processing", body: "End-to-end review and structuring of your overseas application profile.", color: "var(--electric)" },
  { icon: "🛂", title: "Europe Visitor Visa Guidance", body: "Specialist guidance for Schengen and EU visitor visa applications.", color: "var(--violet)" },
  { icon: "📑", title: "Documentation Support", body: "Comprehensive support assembling and verifying every required document.", color: "var(--sunset)" },
  { icon: "💬", title: "Immigration Consultation", body: "Ethical, transparent expert consultation tailored to your goals.", color: "var(--neon-cyan)" },
  { icon: "✍️", title: "Application Assistance", body: "Hands-on assistance preparing and reviewing your visa application.", color: "var(--gold)" },
  { icon: "✈️", title: "Travel Consultation", body: "Practical travel guidance for first-time and frequent international travelers.", color: "var(--indigo-glow)" },
  { icon: "🤝", title: "Client Support", body: "Dedicated client support from the first call to your final approval.", color: "var(--electric)" },
  { icon: "🌍", title: "International Guidance", body: "Reliable, professional guidance covering 29+ international destinations.", color: "var(--violet)" },
];

const STORIES = [
  { name: "Vikram Singh", role: "Canada", quote: "SkyFly handled my documentation flawlessly. Reliable, transparent and genuinely professional throughout." },
  { name: "Priya Sharma", role: "Germany", quote: "Their guidance made my Europe visitor visa journey stress-free. Highly recommend the Trichy team." },
  { name: "Raj Kumar", role: "France", quote: "Every step was explained clearly. The team's ethical approach builds real trust." },
  { name: "Anita Patel", role: "Spain", quote: "From profile review to final application — the SkyFly process is genuinely premium." },
  { name: "Suresh Reddy", role: "Netherlands", quote: "Exceptional client support. I always knew exactly what to do next." },
  { name: "Meera Nair", role: "Portugal", quote: "Professional, dedicated and trustworthy. SkyFly delivered exactly as promised." },
];

const TRUST_ITEMS = [
  "Licensed Consultancy",
  "Expert Guidance",
  "Transparent Process",
  "Professional Support",
  "Worldwide Assistance",
  "End-to-End Support",
  "Client First Approach",
  "Global Reach",
];

const PROCESS = [
  { step: "01", title: "Consultation", body: "Free 30-minute eligibility & goals assessment.", color: "var(--electric)" },
  { step: "02", title: "Document Verification", body: "Detailed audit of every supporting document.", color: "var(--neon-cyan)" },
  { step: "03", title: "Application Submission", body: "Precise, complete application filed on your behalf.", color: "var(--violet)" },
  { step: "04", title: "Processing", body: "Live status tracking and proactive updates.", color: "var(--sunset)" },
  { step: "05", title: "Visa Approval", body: "Approval, travel briefing and onward support.", color: "var(--gold)" },
];

const TRUST_CARDS = [
  { icon: "🏛️", title: "Registered Private Limited Company", body: "SkyFly International Pvt. Ltd. — a fully registered Indian company.", color: "var(--electric)" },
  { icon: "📑", title: "Professional Documentation Support", body: "Specialists in overseas documentation, formatting and verification.", color: "var(--violet)" },
  { icon: "🔍", title: "Transparent Process", body: "Clear pricing, honest timelines, and ethical guidance — always.", color: "var(--neon-cyan)" },
  { icon: "🤝", title: "Dedicated Support Team", body: "A real human, on real call, from your first query to final approval.", color: "var(--gold)" },
];

const CLIENT_PROVIDES = [
  "Valid Passport",
  "Required Travel Documents",
  "Identity Proof",
  "Supporting Documents",
  "Passport Photos",
  "Bank Statements",
];
const SKYFLY_PROVIDES = [
  "Documentation Guidance",
  "Visa Consultation",
  "Travel Support",
  "Immigration Guidance",
  "Client Assistance",
  "Application Support",
];

const DOCS_REQUIRED = [
  { icon: "🧾", label: "Income Tax Return" },
  { icon: "🏦", label: "Bank Statements" },
  { icon: "🪪", label: "Company ID" },
  { icon: "📄", label: "No Objection Certificate" },
  { icon: "🎖️", label: "Experience Certificate" },
];

const FAQS = [
  { q: "What documents are required?", a: "Typically a valid passport, identity proof, recent passport photos, bank statements, ITR, employment / company ID and supporting travel documents. We share a checklist tailored to your destination." },
  { q: "What services does SkyFly International provide?", a: "Professional overseas documentation, Europe visitor visa guidance, immigration consultation, application assistance, travel consultation and dedicated client support." },
  { q: "How can SkyFly help with visa applications?", a: "We profile-review, verify documents, structure your application, and guide you end-to-end — ethically and transparently — to maximise your chances of approval." },
  { q: "Which countries are supported?", a: "We support 29+ countries with a strong focus on Europe (Schengen) including Germany, France, Spain, Portugal, Italy, Netherlands, Switzerland, Austria, Belgium, Poland, Denmark and Sweden." },
  { q: "What is the consultation process?", a: "Book a free call, share your goals, receive an honest eligibility view, and decide if you'd like SkyFly to take it forward — no pressure, no hidden fees." },
  { q: "What documents do I need to provide?", a: "A valid passport, identity proof, passport photos, bank statements, plus any required supporting documents. We confirm the exact list after your consultation." },
  { q: "Do you provide travel assistance?", a: "Yes — travel consultation, pre-departure briefings and practical guidance for first-time and frequent travelers are part of our service." },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <CursorSpotlight />
      <Particles />
      <LiveNotifs />
      <StickyWhatsApp />

      {/* Background aurora orbs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] size-[60vw] animate-mesh rounded-full blur-[120px] opacity-50" style={{ background: "var(--electric)" }} />
        <div className="absolute top-[10%] -right-[10%] size-[55vw] animate-mesh rounded-full blur-[140px] opacity-40" style={{ background: "var(--violet)", animationDelay: "-6s" }} />
        <div className="absolute -bottom-[10%] left-[20%] size-[50vw] animate-mesh rounded-full blur-[130px] opacity-40" style={{ background: "var(--sunset)", animationDelay: "-12s" }} />
        <div className="absolute top-[40%] left-[35%] size-[35vw] animate-mesh rounded-full blur-[120px] opacity-30" style={{ background: "var(--neon-cyan)", animationDelay: "-3s" }} />
      </div>

      {/* NAV */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/40 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#" className="group flex items-center gap-3">
            <div
              className="relative grid size-11 place-items-center rounded-2xl p-1.5 transition-transform group-hover:scale-110"
              style={{
                background: "color-mix(in oklab, var(--gold) 15%, transparent)",
                boxShadow: "0 0 28px color-mix(in oklab, var(--gold) 55%, transparent)",
              }}
            >
              <img src={skyflyLogo.url} alt="SkyFly International logo" className="size-full object-contain" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              SKYFLY<span style={{ color: "var(--neon-cyan)" }}>INTL</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#process" className="transition-colors hover:text-foreground">Process</a>
            <a href="#countries" className="transition-colors hover:text-foreground">Countries</a>
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </div>

          <MagneticButton as="a" href="#contact" variant="primary" className="!px-6 !py-2.5 text-sm">
            Book Free Call
          </MagneticButton>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-20 px-6 pt-40 pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: "var(--neon-cyan)" }} />
                  <span className="relative inline-flex size-2 rounded-full" style={{ background: "var(--neon-cyan)" }} />
                </span>
                Licensed Consultancy · Trichy, India
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mb-8 text-5xl leading-[0.95] font-bold tracking-tight md:text-6xl lg:text-7xl">
                YOUR GLOBAL
                <br />
                JOURNEY STARTS
                <br />
                WITH <span className="gradient-aurora-text">SKYFLY.</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mb-12 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Professional overseas documentation & global visa guidance. Reliable, transparent and
                ethical — for travelers who refuse to settle for ordinary.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton as="a" href="#contact" variant="primary">Book Free Consultation →</MagneticButton>
                <MagneticButton as="a" href="https://wa.me/918098118198" variant="whatsapp">💬 WhatsApp Now</MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-12 flex items-center gap-6 text-xs tracking-widest text-muted-foreground uppercase">
                <span>Trusted by</span>
                <div className="h-px flex-1 bg-white/10" />
                <span>5,000+ happy clients</span>
              </div>
            </Reveal>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <Reveal delay={250}>
              <div className="relative aspect-square">
                <div
                  aria-hidden
                  className="absolute inset-0 animate-spin-slow rounded-full opacity-40"
                  style={{
                    background: "conic-gradient(from 0deg, var(--electric), var(--violet), var(--sunset), var(--gold), var(--electric))",
                    filter: "blur(60px)",
                  }}
                />
                <div className="absolute inset-4 overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl glow-violet">
                  <img src={heroGlobe} alt="Animated world map with global flight routes" width={1024} height={1024} className="size-full object-cover" />
                  <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, transparent 50%, var(--background) 100%)" }} />
                </div>

                <div className="glass-panel animate-float absolute -top-6 -right-6 z-20 hidden rounded-3xl p-5 shadow-xl md:block">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-xl text-xl" style={{ background: "color-mix(in oklab, var(--sunset) 20%, transparent)" }}>🛂</div>
                    <div>
                      <p className="text-[10px] tracking-widest text-muted-foreground uppercase">Visa Approved</p>
                      <p className="font-bold">Germany 🇩🇪</p>
                    </div>
                  </div>
                </div>

                <div className="glass-panel animate-float-slow absolute -bottom-6 -left-6 z-20 hidden rounded-3xl p-5 shadow-xl md:block">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-xl text-xl" style={{ background: "color-mix(in oklab, var(--electric) 20%, transparent)" }}>✈️</div>
                    <div>
                      <p className="text-[10px] tracking-widest text-muted-foreground uppercase">Flight Booked</p>
                      <p className="font-bold">Paris CDG 🇫🇷</p>
                    </div>
                  </div>
                </div>

                <div className="glass-panel animate-float absolute top-1/3 -left-10 z-20 hidden rounded-2xl p-3 text-2xl shadow-xl md:block" style={{ animationDelay: "1.5s" }}>🇪🇸</div>
                <div className="glass-panel animate-float-slow absolute right-0 bottom-1/3 z-20 hidden rounded-2xl p-3 text-2xl shadow-xl md:block" style={{ animationDelay: "2.2s" }}>🇵🇹</div>
                <div className="glass-panel animate-float absolute top-4 left-1/3 z-20 hidden rounded-2xl p-3 text-2xl shadow-xl md:block" style={{ animationDelay: "0.9s" }}>🇨🇭</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COUNTERS */}
      <section className="relative z-20 px-6 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { v: 5000, suffix: "+", label: "Happy Clients", color: "var(--neon-cyan)" },
            { v: 29, suffix: "+", label: "Countries Supported", color: "var(--violet)" },
            { v: 10000, suffix: "+", label: "Consultations", color: "var(--sunset)" },
            { v: 8, suffix: "+", label: "Years Experience", color: "var(--electric)" },
          ].map((s, idx) => (
            <Reveal key={s.label} delay={idx * 100}>
              <div
                className="glass-panel group relative overflow-hidden rounded-3xl p-8 text-center transition-all duration-500 hover:-translate-y-2"
                style={{ borderColor: `color-mix(in oklab, ${s.color} 30%, transparent)` }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 50% 0%, color-mix(in oklab, ${s.color} 25%, transparent), transparent 60%)` }} />
                <h3 className="relative mb-2 text-5xl font-bold transition-transform duration-300 group-hover:scale-110 md:text-6xl" style={{ color: s.color, textShadow: `0 0 24px ${s.color}` }}>
                  <CountUp end={s.v} suffix={s.suffix} />
                </h3>
                <p className="relative text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section className="relative z-20 overflow-hidden border-y border-white/5 py-8" style={{ background: "color-mix(in oklab, var(--electric) 6%, transparent)" }}>
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((t, i) => (
            <div key={i} className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase">
              <span className="size-1.5 rounded-full" style={{ background: "var(--neon-cyan)", boxShadow: "0 0 12px var(--neon-cyan)" }} />
              <span style={{ color: "color-mix(in oklab, var(--foreground) 80%, transparent)" }}>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-20 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--neon-cyan)" }}>About SkyFly</p>
              <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
                Professional overseas documentation
                <br />
                & <span className="gradient-aurora-text">global visa guidance.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                SkyFly International Pvt. Ltd. is a registered professional consultancy based in Trichy, India,
                guiding clients across 29+ countries with reliable, transparent and ethical visa support.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "✅", title: "Licensed & Trusted", body: "Registered Private Limited consultancy operating under strict ethical standards.", color: "var(--electric)" },
              { icon: "🌍", title: "Global Reach", body: "Active support across 29+ international destinations with a focus on Europe.", color: "var(--violet)" },
              { icon: "👥", title: "Expert Team", body: "Documentation specialists with 8+ years of hands-on consultancy experience.", color: "var(--sunset)" },
              { icon: "🏆", title: "Proven Track Record", body: "5,000+ happy clients and 10,000+ successful consultations delivered.", color: "var(--neon-cyan)" },
              { icon: "🎯", title: "Personalized Approach", body: "Every profile is reviewed and structured individually — never one-size-fits-all.", color: "var(--gold)" },
              { icon: "🤝", title: "End-to-End Support", body: "From first consultation to final approval and pre-departure briefing.", color: "var(--indigo-glow)" },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="glass-panel group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2" style={{ borderColor: `color-mix(in oklab, ${c.color} 25%, transparent)` }}>
                  <div className="absolute -top-10 -right-10 size-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-60" style={{ background: c.color }} />
                  <div className="relative">
                    <div className="mb-5 grid size-14 place-items-center rounded-2xl text-3xl" style={{ background: `color-mix(in oklab, ${c.color} 18%, transparent)`, boxShadow: `0 0 24px color-mix(in oklab, ${c.color} 40%, transparent)` }}>{c.icon}</div>
                    <h3 className="mb-2 text-xl font-bold">{c.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="relative z-20 px-6 py-32">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="glass-panel relative overflow-hidden rounded-[3rem] p-12 text-center md:p-20" style={{ borderColor: "color-mix(in oklab, var(--violet) 30%, transparent)" }}>
              <div aria-hidden className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--violet) 30%, transparent), transparent 70%)" }} />
              <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-white/10" />
              <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-white/10" style={{ animationDirection: "reverse" }} />
              <div className="relative">
                <p className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--gold)" }}>Our Mission</p>
                <p className="font-display text-2xl leading-snug md:text-4xl">
                  "To empower individuals by providing <span className="gradient-aurora-text">reliable, transparent and professional</span> guidance for overseas travel and immigration — through ethical practices and dedicated client support."
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section id="process" className="relative z-20 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-20 text-center">
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--electric)" }}>Visa Process</p>
              <h2 className="text-4xl font-bold tracking-tight md:text-6xl">From consultation to <span className="gradient-aurora-text">takeoff.</span></h2>
            </div>
          </Reveal>

          <div className="relative">
            <div aria-hidden className="absolute top-12 left-0 hidden h-1 w-full overflow-hidden rounded-full bg-white/5 lg:block">
              <div className="h-full animate-marquee" style={{ background: "linear-gradient(90deg, transparent, var(--neon-cyan), var(--violet), var(--sunset), transparent)", width: "200%" }} />
            </div>
            <div className="grid gap-6 lg:grid-cols-5">
              {PROCESS.map((p, i) => (
                <Reveal key={p.step} delay={i * 120}>
                  <div className="glass-panel group relative rounded-3xl p-6 text-center transition-all duration-500 hover:-translate-y-2" style={{ borderColor: `color-mix(in oklab, ${p.color} 35%, transparent)` }}>
                    <div className="relative mx-auto mb-4 grid size-16 place-items-center rounded-full text-xl font-bold" style={{ background: `color-mix(in oklab, ${p.color} 18%, transparent)`, color: p.color, boxShadow: `0 0 24px ${p.color}` }}>
                      <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full" style={{ background: p.color }} />
                      <span className="relative">{p.step}</span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST CARDS */}
      <section className="relative z-20 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--gold)" }}>Why clients trust us</p>
              <h2 className="text-4xl font-bold tracking-tight md:text-6xl">Built on <span className="gradient-aurora-text">trust & transparency.</span></h2>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TRUST_CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <div className="glass-panel group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2" style={{ borderColor: `color-mix(in oklab, ${c.color} 30%, transparent)` }}>
                  <div className="absolute -top-10 -right-10 size-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60" style={{ background: c.color }} />
                  <div className="relative">
                    <div className="mb-5 text-4xl">{c.icon}</div>
                    <h3 className="mb-3 text-lg font-bold">{c.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase" style={{ color: c.color }}>
                      ✓ Verified
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTRIES */}
      <section id="countries" className="relative z-20 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
              <div className="max-w-2xl">
                <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--neon-cyan)" }}>Destinations</p>
                <h2 className="text-4xl font-bold tracking-tight md:text-6xl">29+ countries. <span className="gradient-aurora-text">One concierge.</span></h2>
              </div>
              <p className="max-w-sm text-muted-foreground">Premium guidance across Europe and beyond — Schengen, study, work and visit visas.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {COUNTRIES.map((c, i) => (
              <Reveal key={c.name} delay={i * 50}>
                <div className="glass-panel group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.03]" style={{ borderColor: `color-mix(in oklab, ${c.accent} 30%, transparent)` }}>
                  <div className="absolute -top-12 -right-12 size-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60" style={{ background: c.accent }} />
                  <div className="relative">
                    <div className="mb-4 text-5xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110">{c.flag}</div>
                    <h3 className="mb-1 text-lg font-bold">{c.name}</h3>
                    <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: c.accent }}>{c.tag}</p>
                    <div className="mt-4 flex gap-2">
                      <a href="#contact" className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold tracking-widest uppercase transition-colors hover:bg-white/10">Explore</a>
                      <a href="#contact" className="rounded-full px-3 py-1 text-[10px] font-semibold tracking-widest uppercase text-primary-foreground" style={{ background: c.accent }}>Apply</a>
                    </div>
                    <div className="mt-5 h-px w-0 transition-all duration-500 group-hover:w-full" style={{ background: c.accent, boxShadow: `0 0 10px ${c.accent}` }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative z-20 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-20 text-center">
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--sunset)" }}>Our Services</p>
              <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">Professional documentation & guidance</h2>
              <div className="mx-auto h-1 w-24 rounded-full" style={{ background: "var(--gradient-cyan-violet)" }} />
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <div className="glass-panel group relative overflow-hidden rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-3" style={{ borderColor: `color-mix(in oklab, ${s.color} 25%, transparent)` }}>
                  <div className="absolute -top-10 -right-10 size-40 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150" style={{ background: `color-mix(in oklab, ${s.color} 25%, transparent)` }} />
                  <div className="relative">
                    <div className="mb-5 grid size-14 place-items-center rounded-2xl text-3xl transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" style={{ background: `color-mix(in oklab, ${s.color} 18%, transparent)`, boxShadow: `0 0 24px color-mix(in oklab, ${s.color} 40%, transparent)` }}>{s.icon}</div>
                    <h3 className="mb-2 text-lg font-bold">{s.title}</h3>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-0 transition-all duration-700 group-hover:w-full" style={{ background: s.color, boxShadow: `0 0 12px ${s.color}` }} />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROFILE PROCESSING — Orbiting docs */}
      <section className="relative z-20 px-6 py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--neon-cyan)" }}>Profile Processing</p>
              <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">Every document, <span className="gradient-aurora-text">precision-verified.</span></h2>
              <p className="mb-8 text-muted-foreground">
                We structure and verify the essential documents that make or break overseas applications —
                handled by specialists, reviewed end-to-end.
              </p>
              <ul className="space-y-3">
                {DOCS_REQUIRED.map((d) => (
                  <li key={d.label} className="glass-panel flex items-center gap-3 rounded-2xl p-4">
                    <span className="text-2xl">{d.icon}</span>
                    <span className="font-medium">{d.label}</span>
                    <span className="ml-auto text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--neon-cyan)" }}>✓ Verified</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div aria-hidden className="absolute inset-0 animate-spin-slow rounded-full border border-white/10" />
              <div aria-hidden className="absolute inset-8 animate-spin-slow rounded-full border border-white/10" style={{ animationDirection: "reverse", animationDuration: "15s" }} />
              <div aria-hidden className="absolute inset-16 animate-spin-slow rounded-full border border-white/10" style={{ animationDuration: "10s" }} />
              <div className="glass-panel absolute top-1/2 left-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-5xl glow-cyan">📋</div>
              {DOCS_REQUIRED.map((d, i) => {
                const angle = (i / DOCS_REQUIRED.length) * Math.PI * 2;
                const r = 42;
                const x = 50 + Math.cos(angle) * r;
                const y = 50 + Math.sin(angle) * r;
                return (
                  <div
                    key={d.label}
                    className="glass-panel animate-float absolute grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl text-2xl shadow-xl"
                    style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.4}s` }}
                    title={d.label}
                  >
                    {d.icon}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHAT YOU PROVIDE VS WHAT WE PROVIDE */}
      <section className="relative z-20 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--violet)" }}>How it works</p>
              <h2 className="text-4xl font-bold tracking-tight md:text-6xl">What <span className="gradient-aurora-text">you provide</span> vs what <span className="gradient-aurora-text">we provide.</span></h2>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="glass-panel relative overflow-hidden rounded-3xl p-10" style={{ borderColor: "color-mix(in oklab, var(--electric) 35%, transparent)" }}>
                <div className="absolute -top-20 -right-20 size-60 rounded-full blur-3xl opacity-50" style={{ background: "var(--electric)" }} />
                <div className="relative">
                  <p className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--electric)" }}>You provide</p>
                  <h3 className="mb-8 text-3xl font-bold">Your essentials</h3>
                  <ul className="space-y-3">
                    {CLIENT_PROVIDES.map((x) => (
                      <li key={x} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                        <span className="grid size-7 place-items-center rounded-full text-xs font-bold" style={{ background: "color-mix(in oklab, var(--electric) 30%, transparent)", color: "var(--electric)" }}>→</span>
                        <span className="font-medium">{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="glass-panel relative overflow-hidden rounded-3xl p-10" style={{ borderColor: "color-mix(in oklab, var(--sunset) 35%, transparent)" }}>
                <div className="absolute -top-20 -right-20 size-60 rounded-full blur-3xl opacity-50" style={{ background: "var(--sunset)" }} />
                <div className="relative">
                  <p className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--sunset)" }}>SkyFly provides</p>
                  <h3 className="mb-8 text-3xl font-bold">Your guidance</h3>
                  <ul className="space-y-3">
                    {SKYFLY_PROVIDES.map((x) => (
                      <li key={x} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                        <span className="grid size-7 place-items-center rounded-full text-xs font-bold" style={{ background: "color-mix(in oklab, var(--sunset) 30%, transparent)", color: "var(--sunset)" }}>✓</span>
                        <span className="font-medium">{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES MARQUEE */}
      <section id="stories" className="relative z-20 overflow-hidden py-32">
        <Reveal>
          <div className="mx-auto max-w-7xl px-6 text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--gold)" }}>Success Stories</p>
            <h2 className="mb-16 text-4xl font-bold tracking-tight md:text-6xl">Trusted by <span className="gradient-aurora-text">global travelers</span></h2>
          </div>
        </Reveal>

        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32" style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32" style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />

          <div className="flex animate-marquee gap-6">
            {[...STORIES, ...STORIES].map((s, i) => (
              <div key={i} className="glass-panel w-[420px] shrink-0 rounded-3xl p-8 transition-transform duration-500 hover:scale-105">
                <div className="mb-5 flex gap-1" style={{ color: "var(--gold)" }}>
                  {Array.from({ length: 5 }).map((_, k) => (<span key={k} className="text-sm">★</span>))}
                </div>
                <p className="mb-6 leading-relaxed text-foreground/90 italic">"{s.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="grid size-12 place-items-center rounded-full font-bold" style={{ background: "var(--gradient-aurora)", boxShadow: "var(--shadow-glow-violet)" }}>{s.name[0]}</div>
                  <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs tracking-wider text-muted-foreground uppercase">{s.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-20 px-6 py-32">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--neon-cyan)" }}>FAQ</p>
              <h2 className="text-4xl font-bold tracking-tight md:text-6xl">Questions, <span className="gradient-aurora-text">answered.</span></h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 60}>
                  <div className="glass-panel overflow-hidden rounded-2xl transition-all duration-500" style={{ borderColor: open ? "color-mix(in oklab, var(--neon-cyan) 40%, transparent)" : undefined, boxShadow: open ? "var(--shadow-glow-cyan)" : undefined }}>
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-white/[0.03]"
                    >
                      <span className="font-display text-lg font-semibold">{f.q}</span>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full text-lg transition-transform duration-500" style={{ background: "color-mix(in oklab, var(--neon-cyan) 18%, transparent)", color: "var(--neon-cyan)", transform: open ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                    </button>
                    <div
                      className="grid overflow-hidden transition-all duration-500"
                      style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
                    >
                      <div className="min-h-0">
                        <p className="px-6 pb-6 leading-relaxed text-muted-foreground">{f.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-20 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--electric)" }}>Contact</p>
              <h2 className="text-4xl font-bold tracking-tight md:text-6xl">Your departure gate is <span className="gradient-aurora-text">open.</span></h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Book a free 30-minute consultation. No commitment. We'll reply within 24 hours.</p>
            </div>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-5">
            {/* info */}
            <Reveal className="lg:col-span-2">
              <div className="space-y-4">
                {[
                  { icon: "📞", label: "Phone", value: "+91 8098118198", href: "tel:+918098118198", color: "var(--neon-cyan)" },
                  { icon: "✉️", label: "Email", value: "adminskyfly2026@gmail.com", href: "mailto:adminskyfly2026@gmail.com", color: "var(--violet)" },
                  { icon: "📍", label: "Address", value: "No.54 (1st Floor), Vanapattarai Street, Trichy, Tamil Nadu — 620002, India", color: "var(--sunset)" },
                  { icon: "🕒", label: "Office Hours", value: "Monday – Saturday · 10:00 AM – 5:30 PM", color: "var(--gold)" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="glass-panel group flex items-start gap-4 rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1"
                    style={{ borderColor: `color-mix(in oklab, ${c.color} 25%, transparent)` }}
                  >
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl text-2xl transition-transform duration-500 group-hover:scale-110" style={{ background: `color-mix(in oklab, ${c.color} 18%, transparent)`, boxShadow: `0 0 18px color-mix(in oklab, ${c.color} 40%, transparent)` }}>{c.icon}</div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-muted-foreground">{c.label}</p>
                      <p className="font-semibold">{c.value}</p>
                    </div>
                  </a>
                ))}
                <MagneticButton as="a" href="https://wa.me/918098118198" variant="whatsapp" className="w-full">💬 Chat on WhatsApp</MagneticButton>
              </div>
            </Reveal>

            {/* form */}
            <Reveal delay={150} className="lg:col-span-3">
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="glass-panel relative overflow-hidden rounded-[2rem] p-8 md:p-10"
                style={{ borderColor: "color-mix(in oklab, var(--electric) 35%, transparent)" }}
              >
                <div aria-hidden className="absolute -top-20 -right-20 size-72 rounded-full blur-3xl opacity-40" style={{ background: "var(--electric)" }} />
                <div className="relative space-y-5">
                  <h3 className="mb-2 text-2xl font-bold">Book a free consultation</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Full Name" placeholder="Your name" required />
                    <Field label="Phone" type="tel" placeholder="+91 ..." required />
                  </div>
                  <Field label="Email" type="email" placeholder="you@email.com" required />
                  <Field label="Destination Country" placeholder="e.g. Germany" />
                  <div>
                    <label className="mb-2 block text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your travel goals..."
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-[color-mix(in_oklab,var(--neon-cyan)_60%,transparent)] focus:bg-white/[0.06] focus:shadow-[0_0_24px_color-mix(in_oklab,var(--neon-cyan)_35%,transparent)]"
                    />
                  </div>
                  {submitted ? (
                    <div className="rounded-2xl border p-4 text-center" style={{ borderColor: "color-mix(in oklab, var(--neon-cyan) 50%, transparent)", background: "color-mix(in oklab, var(--neon-cyan) 10%, transparent)" }}>
                      <p className="font-semibold" style={{ color: "var(--neon-cyan)" }}>✓ Request received — we'll be in touch within 24 hours.</p>
                    </div>
                  ) : (
                    <MagneticButton variant="primary" className="w-full">Request Free Consultation →</MagneticButton>
                  )}
                  <p className="text-center text-xs tracking-wider text-muted-foreground uppercase">No commitment · Reply within 24 hours</p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-20 border-t border-white/5 px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl p-1.5" style={{ background: "color-mix(in oklab, var(--gold) 15%, transparent)", boxShadow: "0 0 28px color-mix(in oklab, var(--gold) 55%, transparent)" }}>
                <img src={skyflyLogo.url} alt="SkyFly logo" className="size-full object-contain" />
              </div>
              <span className="font-display text-lg font-bold tracking-widest uppercase">SkyFly International Pvt. Ltd.</span>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Your Global Journey Starts With SkyFly. Professional overseas documentation and global visa
              guidance from Trichy, India — to the world.
            </p>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Reach us</p>
            <ul className="space-y-2 text-sm">
              <li><a href="tel:+918098118198" className="hover:text-foreground transition-colors">+91 8098118198</a></li>
              <li><a href="mailto:adminskyfly2026@gmail.com" className="hover:text-foreground transition-colors break-all">adminskyfly2026@gmail.com</a></li>
              <li className="text-muted-foreground">Mon–Sat · 10:00 AM – 5:30 PM</li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Office</p>
            <p className="text-sm text-muted-foreground">No.54 (1st Floor),<br />Vanapattarai Street,<br />Trichy, Tamil Nadu — 620002,<br />India</p>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs tracking-wider text-muted-foreground uppercase md:flex-row">
          <span>© 2026 SkyFly International Pvt. Ltd.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">{label}{required && <span style={{ color: "var(--sunset)" }}> *</span>}</label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-[color-mix(in_oklab,var(--neon-cyan)_60%,transparent)] focus:bg-white/[0.06] focus:shadow-[0_0_24px_color-mix(in_oklab,var(--neon-cyan)_35%,transparent)]"
      />
    </div>
  );
}
