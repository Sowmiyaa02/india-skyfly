import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroGlobe from "@/assets/hero-globe.jpg";
import skyflyLogo from "@/assets/skyfly-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkyFly International — Beyond Borders. Without Friction." },
      {
        name: "description",
        content:
          "Premium global immigration & visa consultancy. 5,000+ approvals across 29+ countries with a 98% success rate. Book your free consultation.",
      },
      { property: "og:title", content: "SkyFly International — Beyond Borders." },
      {
        property: "og:description",
        content:
          "The world's most sophisticated visa & immigration consultancy. 5,000+ approvals, 29+ countries, 98% success rate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ------------------------------------------------------------------ */
/* Cursor spotlight – follows mouse across the page                   */
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

/* ------------------------------------------------------------------ */
/* Scroll-progress bar                                                */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/* Count-up number                                                    */
/* ------------------------------------------------------------------ */
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
            const duration = 1600;
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

/* ------------------------------------------------------------------ */
/* Reveal on scroll                                                   */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/* Magnetic button                                                    */
/* ------------------------------------------------------------------ */
function MagneticButton({
  children,
  className = "",
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const base =
    "relative overflow-hidden rounded-2xl font-bold transition-transform duration-200 will-change-transform";
  const styles =
    variant === "primary"
      ? "px-8 py-4 text-base text-primary-foreground glow-electric"
      : "px-8 py-4 text-base glass-panel hover:bg-white/10";
  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${styles} ${className}`}
      style={
        variant === "primary"
          ? { background: "var(--gradient-aurora)" }
          : undefined
      }
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-y-0 -left-1/3 w-1/3 animate-light-sweep bg-white/30 blur-md"
        />
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Live notification toast                                            */
/* ------------------------------------------------------------------ */
const NOTIFS = [
  { tag: "Visa Approved", text: "UK Tier-2 — A. Thompson", color: "var(--neon-cyan)" },
  { tag: "Consultation Booked", text: "Just now — Toronto Office", color: "var(--violet)" },
  { tag: "Application Submitted", text: "Canada Express Entry", color: "var(--sunset)" },
  { tag: "Success Story Added", text: "M. Chen — Software Architect", color: "var(--gold)" },
  { tag: "Visa Approved", text: "Schengen — E. Rodriguez", color: "var(--electric)" },
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

/* ------------------------------------------------------------------ */
/* Floating particle field                                            */
/* ------------------------------------------------------------------ */
function Particles() {
  const dots = Array.from({ length: 26 }, (_, i) => i);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {dots.map((i) => {
        const colors = ["var(--electric)", "var(--violet)", "var(--neon-cyan)", "var(--sunset)"];
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
      {/* shooting stars */}
      <span
        className="absolute top-[15%] left-[8%] h-px w-24 animate-shoot opacity-0"
        style={{ background: "linear-gradient(90deg, transparent, var(--neon-cyan))" }}
      />
      <span
        className="absolute top-[5%] left-[45%] h-px w-32 animate-shoot opacity-0"
        style={{ background: "linear-gradient(90deg, transparent, var(--sunset))", animationDelay: "2.5s" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */
const COUNTRIES = [
  { name: "Canada", flag: "🇨🇦", tag: "Express Entry", accent: "var(--electric)" },
  { name: "United Kingdom", flag: "🇬🇧", tag: "Skilled Worker", accent: "var(--sunset)" },
  { name: "Australia", flag: "🇦🇺", tag: "Subclass 189", accent: "var(--gold)" },
  { name: "Germany", flag: "🇩🇪", tag: "EU Blue Card", accent: "var(--violet)" },
  { name: "United States", flag: "🇺🇸", tag: "EB-1 / O-1", accent: "var(--neon-cyan)" },
  { name: "UAE", flag: "🇦🇪", tag: "Golden Visa", accent: "var(--gold)" },
  { name: "New Zealand", flag: "🇳🇿", tag: "Skilled Migrant", accent: "var(--electric)" },
  { name: "Singapore", flag: "🇸🇬", tag: "Tech.Pass", accent: "var(--violet)" },
];

const SERVICES = [
  {
    icon: "🛂",
    title: "Investor Programs",
    body: "Strategic citizenship-by-investment for high-net-worth individuals and their families.",
    color: "var(--electric)",
  },
  {
    icon: "🎓",
    title: "Study Abroad",
    body: "Placement in Tier-1 global universities with scholarship and visa facilitation.",
    color: "var(--violet)",
  },
  {
    icon: "💼",
    title: "Skilled Migration",
    body: "Professional pathways for tech, medicine, and engineering experts worldwide.",
    color: "var(--sunset)",
  },
  {
    icon: "🏢",
    title: "Corporate Mobility",
    body: "Entity setup, compliance, and global employee relocation for scaling teams.",
    color: "var(--neon-cyan)",
  },
  {
    icon: "💞",
    title: "Family & Spouse",
    body: "Reunification, dependent, and partner visas processed with care and precision.",
    color: "var(--gold)",
  },
  {
    icon: "✈️",
    title: "Tourist & Visit",
    body: "Multi-entry tourist visas with end-to-end document support and fast turnaround.",
    color: "var(--indigo-glow)",
  },
];

const STORIES = [
  {
    name: "Marcus Chen",
    role: "Software Architect → London, UK",
    quote:
      "From first call to landing at Heathrow took just 11 weeks. The SkyFly portal made it feel like ordering a flight.",
  },
  {
    name: "Elena Rodriguez",
    role: "Medical Director → Toronto, CA",
    quote:
      "They didn't just file paperwork — they built a case that was impossible to reject. Genuinely premium service.",
  },
  {
    name: "David Okoro",
    role: "Creative Lead → Vancouver, CA",
    quote:
      "Absolute peace of mind throughout. Every detail handled, every deadline met. World class.",
  },
  {
    name: "Aisha Patel",
    role: "Founder → Dubai, UAE",
    quote:
      "Golden Visa approved in record time. The SkyFly team is operating five years ahead of the industry.",
  },
  {
    name: "Liam Schwartz",
    role: "Data Scientist → Berlin, DE",
    quote:
      "EU Blue Card and relocation handled flawlessly. Onboarded at my new role on day one.",
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <CursorSpotlight />
      <Particles />
      <LiveNotifs />

      {/* Background aurora orbs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-[20%] -left-[10%] size-[60vw] animate-mesh rounded-full blur-[120px] opacity-50"
          style={{ background: "var(--electric)" }}
        />
        <div
          className="absolute top-[10%] -right-[10%] size-[55vw] animate-mesh rounded-full blur-[140px] opacity-40"
          style={{ background: "var(--violet)", animationDelay: "-6s" }}
        />
        <div
          className="absolute -bottom-[10%] left-[20%] size-[50vw] animate-mesh rounded-full blur-[130px] opacity-40"
          style={{ background: "var(--sunset)", animationDelay: "-12s" }}
        />
        <div
          className="absolute top-[40%] left-[35%] size-[35vw] animate-mesh rounded-full blur-[120px] opacity-30"
          style={{ background: "var(--neon-cyan)", animationDelay: "-3s" }}
        />
      </div>

      {/* ------------------------------------------------ NAV ------------------------------------------------ */}
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

          <div className="hidden items-center gap-10 text-sm font-medium text-muted-foreground md:flex">
            <a href="#countries" className="transition-colors hover:text-foreground">Destinations</a>
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#stories" className="transition-colors hover:text-foreground">Success Stories</a>
            <a href="#cta" className="transition-colors hover:text-foreground">Contact</a>
          </div>

          <MagneticButton variant="primary" className="!px-6 !py-2.5 text-sm">
            Book Free Call
          </MagneticButton>
        </div>
      </nav>

      {/* ------------------------------------------------ HERO ------------------------------------------------ */}
      <section className="relative z-20 px-6 pt-40 pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide backdrop-blur-md">
                <span className="relative flex size-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ background: "var(--neon-cyan)" }}
                  />
                  <span
                    className="relative inline-flex size-2 rounded-full"
                    style={{ background: "var(--neon-cyan)" }}
                  />
                </span>
                98% Visa Success Rate · Globally
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mb-8 text-6xl leading-[0.92] font-bold tracking-tight md:text-7xl lg:text-8xl">
                BEYOND
                <br />
                <span className="gradient-aurora-text">BOUNDARIES.</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mb-12 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Experience the next generation of global mobility. We don't just process visas — we
                engineer your international future with surgical precision.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton variant="primary">Start Your Journey →</MagneticButton>
                <MagneticButton variant="ghost">▶ How it Works</MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-12 flex items-center gap-6 text-xs tracking-widest text-muted-foreground uppercase">
                <span>Trusted by</span>
                <div className="h-px flex-1 bg-white/10" />
                <span>5,000+ global citizens</span>
              </div>
            </Reveal>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <Reveal delay={250}>
              <div className="relative aspect-square">
                {/* Glow rings behind globe */}
                <div
                  aria-hidden
                  className="absolute inset-0 animate-spin-slow rounded-full opacity-40"
                  style={{
                    background: "conic-gradient(from 0deg, var(--electric), var(--violet), var(--sunset), var(--electric))",
                    filter: "blur(60px)",
                  }}
                />
                <div className="absolute inset-4 overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl glow-violet">
                  <img
                    src={heroGlobe}
                    alt="Holographic world map showing global flight routes"
                    width={1024}
                    height={1024}
                    className="size-full object-cover"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, transparent 50%, var(--background) 100%)",
                    }}
                  />
                </div>

                {/* Floating glass cards */}
                <div className="glass-panel animate-float absolute -top-6 -right-6 z-20 hidden rounded-3xl p-5 shadow-xl md:block">
                  <div className="flex items-center gap-3">
                    <div
                      className="grid size-11 place-items-center rounded-xl text-xl"
                      style={{ background: "color-mix(in oklab, var(--sunset) 20%, transparent)" }}
                    >
                      🛂
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                        Visa Approved
                      </p>
                      <p className="font-bold">Schengen Area</p>
                    </div>
                  </div>
                </div>

                <div className="glass-panel animate-float-slow absolute -bottom-6 -left-6 z-20 hidden rounded-3xl p-5 shadow-xl md:block">
                  <div className="flex items-center gap-3">
                    <div
                      className="grid size-11 place-items-center rounded-xl text-xl"
                      style={{ background: "color-mix(in oklab, var(--electric) 20%, transparent)" }}
                    >
                      ✈️
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                        Flight Booked
                      </p>
                      <p className="font-bold">London Heathrow</p>
                    </div>
                  </div>
                </div>

                <div
                  className="glass-panel animate-float absolute top-1/3 -left-10 z-20 hidden rounded-2xl p-3 text-2xl shadow-xl md:block"
                  style={{ animationDelay: "1.5s" }}
                >
                  🇨🇦
                </div>
                <div
                  className="glass-panel animate-float-slow absolute right-0 bottom-1/3 z-20 hidden rounded-2xl p-3 text-2xl shadow-xl md:block"
                  style={{ animationDelay: "2.2s" }}
                >
                  🇬🇧
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ COUNTERS ------------------------------------------------ */}
      <section className="relative z-20 px-6 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { v: 5000, suffix: "+", label: "Happy Clients", color: "var(--neon-cyan)" },
            { v: 29, suffix: "+", label: "Countries", color: "var(--violet)" },
            { v: 8, suffix: "+", label: "Years Experience", color: "var(--sunset)" },
            { v: 98, suffix: "%", label: "Success Rate", color: "var(--electric)" },
          ].map((s, idx) => (
            <Reveal key={s.label} delay={idx * 100}>
              <div
                className="glass-panel group relative overflow-hidden rounded-3xl p-8 text-center transition-all duration-500 hover:-translate-y-2"
                style={{ borderColor: `color-mix(in oklab, ${s.color} 30%, transparent)` }}
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, color-mix(in oklab, ${s.color} 25%, transparent), transparent 60%)`,
                  }}
                />
                <h3
                  className="relative mb-2 text-5xl font-bold transition-transform duration-300 group-hover:scale-110 md:text-6xl"
                  style={{ color: s.color, textShadow: `0 0 24px ${s.color}` }}
                >
                  <CountUp end={s.v} suffix={s.suffix} />
                </h3>
                <p className="relative text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ COUNTRIES ------------------------------------------------ */}
      <section id="countries" className="relative z-20 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
              <div className="max-w-2xl">
                <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--neon-cyan)" }}>
                  Destinations
                </p>
                <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
                  29+ countries. <span className="gradient-aurora-text">One concierge.</span>
                </h2>
              </div>
              <p className="max-w-sm text-muted-foreground">
                Premium pathways to the world's most sought-after economies and cultural hubs.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {COUNTRIES.map((c, i) => (
              <Reveal key={c.name} delay={i * 60}>
                <div
                  className="glass-panel group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.03]"
                  style={{ borderColor: `color-mix(in oklab, ${c.accent} 30%, transparent)` }}
                >
                  <div
                    className="absolute -top-12 -right-12 size-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                    style={{ background: c.accent }}
                  />
                  <div className="relative">
                    <div className="mb-4 text-5xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110">
                      {c.flag}
                    </div>
                    <h3 className="mb-1 text-lg font-bold">{c.name}</h3>
                    <p
                      className="text-xs font-semibold tracking-wider uppercase"
                      style={{ color: c.accent }}
                    >
                      {c.tag}
                    </p>
                    <div
                      className="mt-5 h-px w-0 transition-all duration-500 group-hover:w-full"
                      style={{ background: c.accent, boxShadow: `0 0 10px ${c.accent}` }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ SERVICES ------------------------------------------------ */}
      <section id="services" className="relative z-20 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-20 text-center">
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--sunset)" }}>
                What we do
              </p>
              <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
                Elite mobility services
              </h2>
              <div
                className="mx-auto h-1 w-24 rounded-full"
                style={{ background: "var(--gradient-cyan-violet)" }}
              />
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div
                  className="glass-panel group relative overflow-hidden rounded-[2rem] p-10 transition-all duration-500 hover:-translate-y-3"
                  style={{ borderColor: `color-mix(in oklab, ${s.color} 25%, transparent)` }}
                >
                  <div
                    className="absolute -top-10 -right-10 size-40 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150"
                    style={{ background: `color-mix(in oklab, ${s.color} 25%, transparent)` }}
                  />
                  <div className="relative">
                    <div
                      className="mb-6 grid size-14 place-items-center rounded-2xl text-3xl"
                      style={{
                        background: `color-mix(in oklab, ${s.color} 18%, transparent)`,
                        boxShadow: `0 0 24px color-mix(in oklab, ${s.color} 40%, transparent)`,
                      }}
                    >
                      {s.icon}
                    </div>
                    <h3 className="mb-3 text-2xl font-bold">{s.title}</h3>
                    <p className="mb-8 leading-relaxed text-muted-foreground">{s.body}</p>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full w-0 transition-all duration-700 group-hover:w-full"
                        style={{ background: s.color, boxShadow: `0 0 12px ${s.color}` }}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ SUCCESS STORIES (MARQUEE) ------------------------------------------------ */}
      <section id="stories" className="relative z-20 overflow-hidden py-32">
        <Reveal>
          <div className="mx-auto max-w-7xl px-6 text-center">
            <p
              className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "var(--gold)" }}
            >
              Success Stories
            </p>
            <h2 className="mb-16 text-4xl font-bold tracking-tight md:text-6xl">
              Trusted by <span className="gradient-aurora-text">global citizens</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
            style={{ background: "linear-gradient(to right, var(--background), transparent)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
            style={{ background: "linear-gradient(to left, var(--background), transparent)" }}
          />

          <div className="flex animate-marquee gap-6">
            {[...STORIES, ...STORIES].map((s, i) => (
              <div
                key={i}
                className="glass-panel w-[420px] shrink-0 rounded-3xl p-8 transition-transform duration-500 hover:scale-105"
              >
                <div className="mb-5 flex gap-1" style={{ color: "var(--gold)" }}>
                  {Array.from({ length: 5 }).map((_, k) => (
                    <span key={k} className="text-sm">★</span>
                  ))}
                </div>
                <p className="mb-6 leading-relaxed text-foreground/90 italic">"{s.quote}"</p>
                <div className="flex items-center gap-4">
                  <div
                    className="grid size-12 place-items-center rounded-full font-bold"
                    style={{
                      background: "var(--gradient-aurora)",
                      boxShadow: "var(--shadow-glow-violet)",
                    }}
                  >
                    {s.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs tracking-wider text-muted-foreground uppercase">
                      {s.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ CTA ------------------------------------------------ */}
      <section id="cta" className="relative z-20 px-6 py-32">
        <Reveal>
          <div className="mx-auto max-w-5xl">
            <div
              className="glass-panel relative overflow-hidden rounded-[3rem] p-12 text-center md:p-20"
              style={{ borderColor: "color-mix(in oklab, var(--electric) 40%, transparent)" }}
            >
              {/* Animated rings */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 size-[680px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-white/5"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 size-[460px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-white/10"
                style={{ animationDirection: "reverse", animationDuration: "15s" }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--electric) 30%, transparent), transparent 60%)",
                }}
              />

              <div className="relative">
                <p
                  className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase"
                  style={{ color: "var(--neon-cyan)" }}
                >
                  Ready for takeoff
                </p>
                <h2 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
                  Your departure gate
                  <br />
                  is <span className="gradient-aurora-text">open.</span>
                </h2>
                <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
                  Book a free 30-minute consultation. We'll assess your eligibility profile and map
                  the fastest pathway to your future.
                </p>

                <div className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute inset-0 animate-pulse-ring rounded-full"
                    style={{ background: "var(--electric)", filter: "blur(20px)" }}
                  />
                  <MagneticButton variant="primary" className="!px-12 !py-5 text-lg">
                    Book Free Consultation →
                  </MagneticButton>
                </div>

                <p className="mt-6 text-xs tracking-wider text-muted-foreground uppercase">
                  No commitment · Reply within 24 hours
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------ FOOTER ------------------------------------------------ */}
      <footer className="relative z-20 border-t border-white/5 px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <div
              className="grid size-9 place-items-center rounded-lg font-bold"
              style={{ background: "var(--gradient-aurora)" }}
            >
              S
            </div>
            <span className="text-sm font-semibold tracking-widest uppercase">
              SkyFly International
            </span>
          </div>
          <div className="flex gap-8 text-xs font-medium tracking-wider text-muted-foreground uppercase">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-foreground">Compliance</a>
            <a href="#" className="transition-colors hover:text-foreground">Contact</a>
          </div>
          <div className="text-xs tracking-wider text-muted-foreground uppercase">
            © 2026 SkyFly Global
          </div>
        </div>
      </footer>
    </div>
  );
}
