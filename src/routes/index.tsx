import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import indiaHero from "@/assets/india-hero.jpg";
import placeTaj from "@/assets/place-taj.jpg";
import placeGolden from "@/assets/place-golden.jpg";
import placeJaipur from "@/assets/place-jaipur.jpg";
import placeKerala from "@/assets/place-kerala.jpg";
import placeVaranasi from "@/assets/place-varanasi.jpg";
import placeMysore from "@/assets/place-mysore.jpg";
import placeLadakh from "@/assets/place-ladakh.jpg";
import placeMeenakshi from "@/assets/place-meenakshi.jpg";
import placeGateway from "@/assets/place-gateway.jpg";
import placeKhajuraho from "@/assets/place-khajuraho.jpg";
import placeRann from "@/assets/place-rann.jpg";
import placeHampi from "@/assets/place-hampi.jpg";
import placeDarjeeling from "@/assets/place-darjeeling.jpg";
import skyflyLogo from "@/assets/skyfly-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkyFly International — Incredible India Tourist Guide" },
      {
        name: "description",
        content:
          "Plan your dream India tourist visit with SkyFly International. Visa guidance, day-by-day itineraries, hotel arrangements, and curated historic destinations across India.",
      },
      { property: "og:title", content: "SkyFly International — Incredible India Tourist Guide" },
      {
        property: "og:description",
        content:
          "From visa to return flight — full guidance for international visitors exploring India's most iconic places.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

/* ------------------------------------------------------------ */
/* Utilities                                                    */
/* ------------------------------------------------------------ */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setP((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 z-[60] h-[3px] w-full">
      <div
        className="h-full"
        style={{
          width: `${p}%`,
          background: "var(--gradient-aurora)",
          boxShadow: "var(--shadow-glow-electric)",
        }}
      />
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShown(true),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        transition: "opacity 0.9s ease, transform 0.9s ease",
        transitionDelay: `${delay}ms`,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(32px)",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------ */
/* Data                                                         */
/* ------------------------------------------------------------ */
const PLACES = [
  {
    name: "Taj Mahal",
    city: "Agra, Uttar Pradesh",
    img: placeTaj,
    era: "1632 – 1653 CE",
    rating: "4.9",
    history:
      "Commissioned by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, the Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna. Over 20,000 artisans worked for 22 years to build this UNESCO World Heritage masterpiece — widely regarded as the finest example of Mughal architecture.",
    best: "October – March",
    tip: "Arrive at sunrise (06:00) to see the marble turn from soft pink to dazzling white.",
  },
  {
    name: "Golden Temple",
    city: "Amritsar, Punjab",
    img: placeGolden,
    era: "Built 1581 – 1604 CE",
    rating: "4.9",
    history:
      "Sri Harmandir Sahib, the holiest shrine of Sikhism, sits on a sacred pool — Amrit Sarovar — gilded with 750 kg of pure gold. Its langar (community kitchen) serves free meals to over 100,000 visitors every day, regardless of faith, the largest such kitchen on Earth.",
    best: "November – March",
    tip: "Visit at night when reflections of the gold dome glow on the still water.",
  },
  {
    name: "Hawa Mahal",
    city: "Jaipur, Rajasthan",
    img: placeJaipur,
    era: "1799 CE",
    rating: "4.7",
    history:
      "The 'Palace of Winds' was built by Maharaja Sawai Pratap Singh so that royal women could observe street festivals without being seen. Its honeycomb façade of 953 tiny windows (jharokhas) keeps the interior cool even in Rajasthan's harsh summers — an early masterpiece of passive cooling design.",
    best: "October – February",
    tip: "Pair with a morning visit to Amber Fort and the City Palace.",
  },
  {
    name: "Kerala Backwaters",
    city: "Alleppey, Kerala",
    img: placeKerala,
    era: "Trade route since 3000 BCE",
    rating: "4.8",
    history:
      "A 900 km network of lagoons, lakes and canals running parallel to the Arabian Sea. Ancient Roman, Chinese and Arab traders sailed these waters for spices. Today, traditional kettuvallam houseboats — once cargo barges — drift past coconut groves and paddy fields below sea level.",
    best: "September – March",
    tip: "Book an overnight houseboat for the full sunset-to-sunrise experience.",
  },
  {
    name: "Varanasi Ghats",
    city: "Varanasi, Uttar Pradesh",
    img: placeVaranasi,
    era: "Continuously inhabited 1800 BCE",
    rating: "4.8",
    history:
      "One of the world's oldest living cities, sacred to Hindus, Buddhists and Jains. Its 88 stone ghats descend into the Ganges, where the Ganga Aarti ceremony has been performed every evening for centuries. Mark Twain wrote it was 'older than history, older than tradition'.",
    best: "October – March",
    tip: "Take a small boat at dawn to watch the sun rise over the ghats.",
  },
  {
    name: "Mysore Palace",
    city: "Mysore, Karnataka",
    img: placeMysore,
    era: "Rebuilt 1912 CE",
    rating: "4.7",
    history:
      "The official residence of the Wadiyar dynasty, who ruled Mysore for over 600 years. The current Indo-Saracenic palace is illuminated by nearly 100,000 light bulbs every Sunday evening and during the 10-day Dasara festival — a tradition unchanged since 1912.",
    best: "October – March (Dasara: Sept–Oct)",
    tip: "Plan a Sunday evening visit for the spectacular light show.",
  },
  {
    name: "Pangong Lake",
    city: "Ladakh",
    img: placeLadakh,
    era: "Geological — 4,350 m altitude",
    rating: "4.9",
    history:
      "A 134 km Himalayan endorheic lake that changes colour from turquoise to deep blue through the day. Two-thirds lie in Tibet. Despite its salinity, it freezes completely in winter. Buddhist monasteries along its shore preserve manuscripts more than 1,000 years old.",
    best: "May – September",
    tip: "Acclimatise in Leh for 2 days before driving up to avoid altitude sickness.",
  },
  {
    name: "Meenakshi Temple",
    city: "Madurai, Tamil Nadu",
    img: placeMeenakshi,
    era: "Original shrine 6th century BCE",
    rating: "4.8",
    history:
      "A vast Dravidian temple complex dedicated to Goddess Meenakshi and Lord Sundareswarar. Its 14 gopurams (towers) rise up to 52 m, each covered with thousands of vividly painted sculptures depicting Hindu mythology. The hall of a thousand pillars is an acoustic marvel from the 16th century.",
    best: "October – March",
    tip: "Visit during the evening procession when the deity is carried in a palanquin.",
  },
  {
    name: "Gateway of India",
    city: "Mumbai, Maharashtra",
    img: placeGateway,
    era: "1924 CE",
    rating: "4.6",
    history:
      "A 26-metre basalt arch on the Mumbai harbour built to commemorate the 1911 landing of King George V. Ironically it was also the spot from which the last British troops departed India in 1948. Today it is the city's most photographed monument and the gateway to Elephanta Caves.",
    best: "November – February",
    tip: "Take the 1-hour ferry to Elephanta Caves in the morning before crowds arrive.",
  },
  {
    name: "Khajuraho Temples",
    city: "Madhya Pradesh",
    img: placeKhajuraho,
    era: "950 – 1050 CE",
    rating: "4.7",
    history:
      "A group of 25 surviving Hindu and Jain temples built by the Chandela dynasty, famed for their nagara-style shikhara towers and exquisite sculpture. UNESCO listed for their architectural symmetry and the storytelling carved into every square metre of sandstone.",
    best: "October – February",
    tip: "Stay for the evening sound-and-light show inside the Western Group.",
  },
  {
    name: "Rann of Kutch",
    city: "Gujarat",
    img: placeRann,
    era: "Geological — salt marsh",
    rating: "4.8",
    history:
      "One of the largest salt deserts on Earth, transforming into a glowing white plain after the monsoon dries. The Rann Utsav (Nov–Feb) brings handicraft tents, folk music and full-moon camel rides under a star-bright Gujarati sky.",
    best: "November – February",
    tip: "Plan your visit around a full-moon weekend for the most surreal landscape.",
  },
  {
    name: "Hampi Ruins",
    city: "Karnataka",
    img: placeHampi,
    era: "14th – 16th century CE",
    rating: "4.8",
    history:
      "The royal capital of the Vijayanagara Empire — once one of the richest cities in the medieval world. Spread across boulder-strewn hills are over 1,600 surviving monuments: temples, palaces, market streets and stepped tanks, all designated a UNESCO site.",
    best: "October – February",
    tip: "Rent a cycle or scooter — the ruins are spread across 36 km².",
  },
  {
    name: "Darjeeling Hills",
    city: "West Bengal",
    img: placeDarjeeling,
    era: "Hill station since 1835",
    rating: "4.7",
    history:
      "Perched at 2,050 m with views of Kanchenjunga (the world's third-highest peak), Darjeeling is famous for its tea estates, the UNESCO-listed toy train, and Buddhist monasteries that mark its border with Sikkim and Bhutan.",
    best: "March – May, October – November",
    tip: "Wake before dawn for the Tiger Hill sunrise — Kanchenjunga turns gold first.",
  },
];

const JOURNEY = [
  {
    n: "01",
    title: "Visa & Pre-Arrival",
    body:
      "We verify your eligibility for the Indian e-Tourist Visa, prepare your application, photographs and supporting documents, and guide you through the online submission and biometric appointment.",
  },
  {
    n: "02",
    title: "Flight & Airport Pickup",
    body:
      "Receive a recommended flight checklist, customs guidance and a SIM-card plan. Our partner driver meets you at the arrivals gate with a name placard — no waiting, no language barrier.",
  },
  {
    n: "03",
    title: "Hotel Check-in",
    body:
      "Pre-booked rooms in trusted, traveller-rated hotels near your daily attractions. Check-in, currency exchange, water and a local welcome kit are arranged before you arrive.",
  },
  {
    n: "04",
    title: "Daily Sightseeing",
    body:
      "A structured day-by-day plan with local English-speaking guides, entry tickets, meals at recommended restaurants and rest breaks built around weather and crowd patterns.",
  },
  {
    n: "05",
    title: "Inter-City Transfers",
    body:
      "Comfortable private cars, premium trains or domestic flights between destinations — booked, confirmed and tracked. You always know who is picking you up next.",
  },
  {
    n: "06",
    title: "Cultural Etiquette Briefings",
    body:
      "Short pre-visit briefings on temple etiquette, dress codes, tipping norms and safe street-food choices so you travel with confidence and respect.",
  },
  {
    n: "07",
    title: "24×7 Local Support",
    body:
      "A dedicated WhatsApp travel concierge available throughout your stay — for re-routing, medical help, translation or simply restaurant recommendations.",
  },
  {
    n: "08",
    title: "Departure & Return",
    body:
      "Hotel checkout, airport drop, departure-tax assistance and a post-trip wellness call to make sure you returned home safely.",
  },
];

const SAMPLE_ITINERARY = [
  { day: "Day 1", city: "Delhi", plan: "Arrival & airport pickup, hotel check-in and room allotment, welcome refreshments, gentle evening walk to settle in after the long flight." },
  { day: "Day 2", city: "Delhi", plan: "Light breakfast at hotel, one heritage walk (Red Fort or Humayun's Tomb), traditional thali lunch, free rest in the afternoon, optional Chandni Chowk rickshaw ride." },
  { day: "Day 3", city: "Agra", plan: "Comfortable train transfer, hotel check-in near the Taj, evening at Mehtab Bagh for a sunset view across the river — meals at vetted local restaurants." },
  { day: "Day 4", city: "Jaipur", plan: "Scenic drive with stops, hotel arrival, restful lunch, brief orientation walk near the Pink City bazaar — no rushed sightseeing on transfer days." },
  { day: "Day 5", city: "Jaipur", plan: "One major fort visit (Amber Fort), Rajasthani lunch break, optional Hawa Mahal photo stop, free spa or shopping evening." },
  { day: "Day 6", city: "Varanasi", plan: "Domestic flight, hotel rest, evening Ganga Aarti by boat — light dinner and early sleep." },
  { day: "Day 7", city: "Varanasi → Home", plan: "Sunrise boat ride along the ghats, breakfast, hotel checkout and airport drop — all transfers tracked end to end." },
];

const FAQS = [
  {
    q: "Do I need a visa to visit India as a tourist?",
    a: "Yes. Most nationalities require either an e-Tourist Visa (applied online) or a sticker visa. SkyFly handles the full application end-to-end based on your passport country.",
  },
  {
    q: "What is the best season to visit India?",
    a: "October to March suits most of India — pleasant in the north, cool in the south. The Himalayas (Ladakh, Kashmir) are best from May to September.",
  },
  {
    q: "Is India safe for solo and female travellers?",
    a: "With the right planning it is. We arrange women-friendly hotels, verified drivers and 24×7 local contact, and brief you on regional etiquette before each city.",
  },
  {
    q: "Do you arrange hotels, trains and local guides?",
    a: "Yes — accommodation, inter-city transport, monument tickets and certified English-speaking local guides are all arranged and confirmed before you fly.",
  },
  {
    q: "How early should I start planning?",
    a: "Ideally 6–8 weeks before travel. This gives comfortable time for visa processing, hotel selection and train bookings (Indian rail seats open 120 days ahead).",
  },
];

/* ------------------------------------------------------------ */
/* Page                                                         */
/* ------------------------------------------------------------ */
function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground pb-32">
      <ScrollProgress />

      {/* Aurora background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-60 animate-mesh"
          style={{ background: "var(--gradient-aurora)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,oklch(0.3_0.15_260/0.5),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,oklch(0.4_0.18_30/0.4),transparent_60%)]" />
      </div>

      <Hero />
      <Places />
      <Journey />
      <Itinerary />
      <Etiquette />
      <Faq />
      <About />
      <Contact />
      <Footer />
      <BottomNav />
    </main>
  );
}

/* ------------------------------------------------------------ */
/* Hero                                                         */
/* ------------------------------------------------------------ */
function Hero() {
  return (
    <section id="home" className="relative min-h-[100vh] w-full overflow-hidden">
      <img
        src={indiaHero}
        alt="India travel hero — sunrise over calm waters"
        width={1920}
        height={1080}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.15_0.08_260/0.55)] via-[oklch(0.12_0.08_260/0.35)] to-[oklch(0.08_0.05_260/0.85)]" />

      <div className="relative z-10 mx-auto flex min-h-[100vh] max-w-7xl flex-col gap-12 px-6 pt-24 pb-40 md:px-12">
        {/* Top brand bar (not a nav) */}
        <Reveal>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="grid size-12 place-items-center rounded-xl"
                style={{
                  background: "color-mix(in oklab, var(--gold) 15%, transparent)",
                  boxShadow: "0 0 30px color-mix(in oklab, var(--gold) 45%, transparent)",
                }}
              >
                <img src={skyflyLogo.url} alt="SkyFly logo" className="size-9 object-contain" />
              </div>
              <div className="leading-tight">
                <div className="font-display text-lg tracking-wide text-white">SkyFly International</div>
                <div className="text-xs text-white/70">Incredible India · Tourist Guide</div>
              </div>
            </div>
            <div className="hidden text-right text-xs text-white/70 md:block">
              Trichy, Tamil Nadu · +91 80981 18198
            </div>
          </div>
        </Reveal>

        {/* Main hero grid */}
        <div className="grid flex-1 grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <Reveal>
            <div className="lg:col-span-7">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
                <span className="size-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
                Tourist visa · guidance · sightseeing — fully arranged
              </p>
              <div className="flex items-baseline gap-3 mb-1">
                <span
                  className="font-display text-2xl md:text-3xl text-white/90 animate-fade-up"
                  style={{ animationDelay: "0.1s" }}
                >
                  Welcome to
                </span>
                <span className="animate-welcome-wave text-3xl md:text-4xl" aria-hidden>🙏</span>
              </div>
              <h1
                className="font-display text-6xl leading-[0.95] md:text-8xl lg:text-[10rem] animate-gradient-pan bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #ffffff, var(--gold), var(--sunset), var(--neon-cyan), #ffffff)",
                }}
              >
                India
              </h1>
              <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg">
                A subcontinent of 5,000-year-old temples, royal palaces, snow Himalayas and tropical
                backwaters. We guide international visitors from visa stamp to safe return — every
                hotel, every transfer, every local story.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/70">
                <Pill>UNESCO sites · 43</Pill>
                <Pill>States & UTs · 28 + 8</Pill>
                <Pill>Languages · 22 official</Pill>
                <Pill>Best season · Oct – Mar</Pill>
              </div>
            </div>
          </Reveal>

          {/* Featured place cards (reference image style) */}
          <Reveal delay={150}>
            <div className="flex gap-4 lg:col-span-5 lg:justify-end">
              <FeatureCard
                title="Amritsar Golden Temple"
                rating="4.9 / 5"
                img={placeGolden}
                tall
              />
              <FeatureCard
                title="Tirupati Temple"
                rating="4.2 / 5"
                img={placeMysore}
              />
            </div>
          </Reveal>
        </div>

        {/* Slide indicator */}
        <div className="absolute bottom-44 left-6 hidden flex-col items-center gap-2 text-white/60 md:flex md:left-12">
          <span className="size-3 rounded-full border border-white/40" />
          <span className="h-16 w-px bg-white/30" />
          <span className="text-xs tracking-widest">01 / 08</span>
        </div>
      </div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur">
      {children}
    </span>
  );
}

function FeatureCard({
  title,
  rating,
  img,
  tall = false,
}: {
  title: string;
  rating: string;
  img: string;
  tall?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl transition-transform hover:-translate-y-1 ${
        tall ? "h-64 w-44 md:h-80 md:w-56" : "h-56 w-36 md:h-64 md:w-44"
      }`}
    >
      <img src={img} alt={title} width={400} height={600} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between text-white">
        <span className="text-[11px] font-medium leading-tight">{title}</span>
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] backdrop-blur">{rating}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ */
/* Places                                                       */
/* ------------------------------------------------------------ */
function Places() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="places" className="relative mx-auto max-w-7xl px-6 py-24 md:px-12">
      <Reveal>
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--neon-cyan)]">Popular destinations</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">
              <span className="gradient-aurora-text">8 places</span> every visitor remembers
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/70">
            Tap any place to read its history, the best season to visit and a local insider tip from
            our guides on the ground.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 [perspective:1200px]">
        {PLACES.map((p, i) => (
          <PlaceCard key={p.name} place={p} index={i} onOpen={() => setOpen(i)} />
        ))}
      </div>

      {open !== null && <PlaceModal place={PLACES[open]} onClose={() => setOpen(null)} />}
    </section>
  );
}

function PlaceCard({
  place,
  index,
  onOpen,
}: {
  place: (typeof PLACES)[number];
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShown(true),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${x * 12}deg) translateY(-6px) scale(1.02)`;
    const img = el.querySelector<HTMLImageElement>("[data-img]");
    if (img) img.style.transform = `translate(${-x * 14}px, ${-y * 14}px) scale(1.15)`;
    const glow = el.querySelector<HTMLDivElement>("[data-glow]");
    if (glow) {
      glow.style.background = `radial-gradient(400px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, color-mix(in oklab, var(--neon-cyan) 35%, transparent), transparent 60%)`;
      glow.style.opacity = "1";
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    const img = el.querySelector<HTMLImageElement>("[data-img]");
    if (img) img.style.transform = "";
    const glow = el.querySelector<HTMLDivElement>("[data-glow]");
    if (glow) glow.style.opacity = "0";
  };

  return (
    <button
      ref={ref}
      onClick={onOpen}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        animationDelay: `${index * 90}ms`,
        transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={`group relative h-80 w-full overflow-hidden rounded-2xl border border-white/10 text-left shadow-xl hover:shadow-[0_30px_80px_-20px_oklch(0_0_0/0.7),0_0_60px_-10px_color-mix(in_oklab,var(--neon-cyan)_40%,transparent)] ${
        shown ? "animate-card-rise" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <img
          data-img
          src={place.img}
          alt={place.name}
          width={800}
          height={1024}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* gradient + cursor glow + shine */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div data-glow className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 mix-blend-screen" />
      <div className="card-shine" />

      {/* rating badge */}
      <div
        className="absolute top-3 left-3 rounded-full bg-white/15 px-2.5 py-1 text-[10px] tracking-widest text-white backdrop-blur opacity-0 group-hover:animate-badge-pop"
        style={{ animationDelay: "0.1s", animation: shown ? "badge-pop 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.4s both" : "none" }}
      >
        ★ {place.rating}
      </div>

      {/* tap hint pill */}
      <div className="absolute top-3 right-3 translate-y-[-8px] rounded-full border border-white/20 bg-black/40 px-2 py-1 text-[9px] uppercase tracking-widest text-white/80 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        Read history →
      </div>

      {/* content */}
      <div className="absolute right-4 bottom-4 left-4 text-white" style={{ transform: "translateZ(40px)" }}>
        <div className="overflow-hidden text-[11px] uppercase tracking-widest text-white/70">
          <div className="transition-transform duration-500 group-hover:-translate-y-0.5">{place.city}</div>
        </div>
        <div className="mt-1 overflow-hidden font-display text-xl">
          <div className="transition-transform duration-500 group-hover:-translate-y-0.5">{place.name}</div>
        </div>
        <div className="mt-1 text-[11px] text-white/60">{place.era}</div>
        <div className="mt-3 h-px w-0 bg-gradient-to-r from-[var(--gold)] to-transparent transition-all duration-500 group-hover:w-full" />
      </div>
    </button>
  );
}

function PlaceModal({ place, onClose }: { place: (typeof PLACES)[number]; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div
      className="animate-backdrop-in fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-modal-in relative grid max-h-[88vh] w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl border border-white/15 bg-[oklch(0.15_0.05_260)] shadow-2xl md:grid-cols-2"
        style={{
          boxShadow:
            "0 40px 100px -20px oklch(0 0 0 / 0.8), 0 0 80px -10px color-mix(in oklab, var(--neon-cyan) 30%, transparent)",
        }}
      >
        {/* image with ken burns + shine */}
        <div className="relative h-64 overflow-hidden md:h-full">
          <img
            src={place.img}
            alt={place.name}
            className="animate-ken-burns size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r" />
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
              animation: "shine-sweep 3s ease-in-out 0.6s",
            }}
          />
          <div
            className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-[10px] tracking-widest text-white backdrop-blur"
            style={{ animation: "badge-pop 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.5s both" }}
          >
            ★ {place.rating}
          </div>
        </div>

        <div className="overflow-y-auto p-7 text-white">
          <div
            className="text-[10px] uppercase tracking-[0.3em] text-[var(--neon-cyan)]"
            style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}
          >
            {place.city}
          </div>
          <h3
            className="mt-2 font-display text-3xl"
            style={{ animation: "title-slide 0.8s cubic-bezier(0.65,0,0.35,1) 0.25s both" }}
          >
            {place.name}
          </h3>
          <div
            className="mt-1 text-xs text-white/60"
            style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}
          >
            {place.era} · ★ {place.rating}
          </div>

          <p
            className="mt-5 text-sm leading-relaxed text-white/85"
            style={{ animation: "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s both" }}
          >
            {place.history}
          </p>

          <div
            className="mt-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2"
            style={{ animation: "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.6s both" }}
          >
            <InfoBlock label="Best season">{place.best}</InfoBlock>
            <InfoBlock label="Insider tip">{place.tip}</InfoBlock>
          </div>

          <button
            onClick={onClose}
            className="mt-7 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs backdrop-blur transition-all hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_20px_color-mix(in_oklab,var(--neon-cyan)_60%,transparent)]"
            style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.75s both" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="text-[10px] uppercase tracking-widest text-white/50">{label}</div>
      <div className="mt-1 text-white/90">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------ */
/* Journey                                                      */
/* ------------------------------------------------------------ */
function Journey() {
  return (
    <section id="guide" className="relative mx-auto max-w-7xl px-6 py-24 md:px-12">
      <Reveal>
        <div className="mb-14 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">From landing to leaving</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">
            Full <span className="gradient-aurora-text">visitor guidance</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
            Eight carefully timed touch-points so you never feel lost in a new country.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {JOURNEY.map((j, i) => (
          <Reveal key={j.n} delay={i * 60}>
            <div className="glass-panel group flex gap-5 rounded-2xl p-6 transition-all hover:-translate-y-1">
              <div
                className="grid size-14 shrink-0 place-items-center rounded-xl font-display text-lg"
                style={{
                  background: "var(--gradient-aurora)",
                  boxShadow: "var(--shadow-glow-electric)",
                }}
              >
                {j.n}
              </div>
              <div>
                <h3 className="font-display text-lg text-white">{j.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{j.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ */
/* Itinerary                                                    */
/* ------------------------------------------------------------ */
function Itinerary() {
  return (
    <section id="itinerary" className="relative mx-auto max-w-7xl px-6 py-24 md:px-12">
      <Reveal>
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--electric)]">Sample timetable</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">
            A 7-day <span className="gradient-aurora-text">golden triangle + east</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-white/70">
            Every itinerary we build follows the same clean rhythm: arrive, rest, explore, rest, repeat.
            Below is an example — your real plan is tailored to your interests, pace and travel dates.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="glass-panel overflow-hidden rounded-2xl">
          <div className="grid grid-cols-12 border-b border-white/10 px-6 py-4 text-[10px] uppercase tracking-widest text-white/50">
            <div className="col-span-2">Day</div>
            <div className="col-span-3">City</div>
            <div className="col-span-7">Plan</div>
          </div>
          {SAMPLE_ITINERARY.map((row, i) => (
            <div
              key={row.day}
              className={`grid grid-cols-12 items-center px-6 py-5 text-sm text-white/85 transition-colors hover:bg-white/5 ${
                i !== SAMPLE_ITINERARY.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <div className="col-span-2 font-display text-base text-[var(--gold)]">{row.day}</div>
              <div className="col-span-3 text-white">{row.city}</div>
              <div className="col-span-7 text-white/75">{row.plan}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------ */
/* Etiquette                                                    */
/* ------------------------------------------------------------ */
function Etiquette() {
  const items = [
    { t: "Dress modestly at temples", d: "Cover shoulders and knees. Some shrines require removing leather items." },
    { t: "Remove shoes inside", d: "Shoes come off before entering temples, mosques and most homes." },
    { t: "Use your right hand", d: "Eating, giving and receiving is traditionally done with the right hand." },
    { t: "Carry bottled water", d: "Stick to sealed bottles. Avoid tap water and uncovered ice." },
    { t: "Bargain politely in markets", d: "Friendly negotiation is normal in bazaars — never in malls or fixed-price stores." },
    { t: "Ask before photographing people", d: "Especially at religious ceremonies and in rural areas." },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:px-12">
      <Reveal>
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--violet)]">Travel with respect</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Cultural etiquette</h2>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.t} delay={i * 50}>
            <div className="glass-panel rounded-2xl p-5">
              <div className="font-display text-base text-white">{it.t}</div>
              <p className="mt-1 text-sm text-white/65">{it.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ */
/* FAQ                                                          */
/* ------------------------------------------------------------ */
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative mx-auto max-w-4xl px-6 py-24 md:px-12">
      <Reveal>
        <div className="mb-10 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--neon-cyan)]">Visitor questions</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Good to know</h2>
        </div>
      </Reveal>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <Reveal key={f.q} delay={i * 40}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="glass-panel w-full rounded-2xl p-5 text-left"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium text-white">{f.q}</span>
                <span className="text-[var(--gold)]">{open === i ? "−" : "+"}</span>
              </div>
              <div
                className="grid overflow-hidden text-sm text-white/70 transition-all"
                style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
              >
                <div className="min-h-0">
                  <p className="pt-3 leading-relaxed">{f.a}</p>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ */
/* About                                                        */
/* ------------------------------------------------------------ */
function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-24 md:px-12">
      <div className="glass-panel grid grid-cols-1 gap-8 rounded-3xl p-10 md:grid-cols-2">
        <Reveal>
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">About us</span>
            <h2 className="mt-2 font-display text-4xl">SkyFly International Pvt. Ltd.</h2>
            <p className="mt-5 text-sm leading-relaxed text-white/75">
              We are an India-based travel guidance company specialising in tourist visas and curated
              itineraries for international visitors. Our team has welcomed over 5,000 travellers
              from 29+ countries, with eight years of experience handling every detail from visa
              paperwork to airport drop-off.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              We do not sell packages — we plan personal, transparent journeys. Tell us your dates
              and your interests, and we'll build the trip around you.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="grid grid-cols-2 gap-4">
            <Stat n="5,000+" l="Happy visitors" />
            <Stat n="29+" l="Countries served" />
            <Stat n="8+" l="Years of expertise" />
            <Stat n="24×7" l="Local support" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
      <div className="font-display text-3xl text-white">{n}</div>
      <div className="mt-1 text-xs text-white/60">{l}</div>
    </div>
  );
}

/* ------------------------------------------------------------ */
/* Contact                                                      */
/* ------------------------------------------------------------ */
function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-24 md:px-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <Reveal>
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--neon-cyan)]">Plan your visit</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Start your India journey</h2>
            <p className="mt-4 max-w-md text-sm text-white/70">
              Send us your travel dates and the cities you'd love to see. We'll come back within 24
              hours with a personalised plan.
            </p>
            <div className="mt-8 space-y-3 text-sm text-white/85">
              <ContactRow label="Address">
                SkyFly International Pvt. Ltd., Trichy, Tamil Nadu, India
              </ContactRow>
              <ContactRow label="WhatsApp / Call">+91 80981 18198</ContactRow>
              <ContactRow label="Hours">Mon – Sat · 09:00 – 19:00 IST</ContactRow>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you! Our team will reach out within 24 hours.");
            }}
            className="glass-panel space-y-4 rounded-3xl p-7"
          >
            <Input label="Full name" placeholder="Your name" />
            <Input label="Email" type="email" placeholder="you@example.com" />
            <Input label="Nationality" placeholder="e.g. United Kingdom" />
            <Input label="Travel month" placeholder="e.g. November 2026" />
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-widest text-white/50">
                What would you like to see?
              </label>
              <textarea
                rows={4}
                placeholder="Taj Mahal, Kerala backwaters, anything specific…"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all focus:border-[var(--neon-cyan)] focus:bg-white/10"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl px-5 py-3 font-medium text-black transition-transform hover:scale-[1.02]"
              style={{ background: "var(--gradient-aurora)", boxShadow: "var(--shadow-glow-electric)" }}
            >
              Request my India plan
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Input({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1 block text-[10px] uppercase tracking-widest text-white/50">{label}</label>
      <input
        {...rest}
        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all focus:border-[var(--neon-cyan)] focus:bg-white/10"
      />
    </div>
  );
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-32 shrink-0 text-[10px] uppercase tracking-widest text-white/50">{label}</div>
      <div className="text-white/85">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------ */
/* Footer                                                       */
/* ------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="relative mx-auto max-w-7xl px-6 pt-10 pb-6 text-center text-xs text-white/50 md:px-12">
      © {new Date().getFullYear()} SkyFly International Pvt. Ltd. · Trichy, India · All rights reserved.
    </footer>
  );
}

/* ------------------------------------------------------------ */
/* Fixed bottom nav                                             */
/* ------------------------------------------------------------ */
function BottomNav() {
  const items = [
    { id: "home", label: "Home", icon: "◐" },
    { id: "places", label: "Places", icon: "✦" },
    { id: "guide", label: "Guide", icon: "❖" },
    { id: "itinerary", label: "Plan", icon: "▤" },
    { id: "contact", label: "Contact", icon: "✉" },
  ];
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight / 2;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el) {
          const r = el.getBoundingClientRect();
          const top = r.top + window.scrollY;
          if (y >= top && y < top + r.height) {
            setActive(it.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-5 left-1/2 z-[90] -translate-x-1/2"
    >
      <div
        className="flex items-center gap-1 rounded-full border border-white/15 bg-[oklch(0.12_0.05_260/0.7)] px-2 py-2 shadow-2xl backdrop-blur-xl"
        style={{ boxShadow: "0 20px 60px -10px oklch(0 0 0 / 0.6), 0 0 40px color-mix(in oklab, var(--electric) 25%, transparent)" }}
      >
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-xs transition-all ${
                isActive ? "text-black" : "text-white/80 hover:text-white"
              }`}
              style={
                isActive
                  ? {
                      background: "var(--gradient-aurora)",
                      boxShadow: "var(--shadow-glow-electric)",
                    }
                  : undefined
              }
            >
              <span className="text-sm">{it.icon}</span>
              <span className="hidden sm:inline font-medium">{it.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
