"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const facilities = [
    {
        id: 1,
        name: "Signature Restaurant",
        shortName: "Restaurant",
        floor: "Ground Floor",
        tag: "Dining",
        description:
            "An all-day dining experience curated for connoisseurs. International cuisine, private dining rooms, and a curated wine cellar set against panoramic city views.",
        details: ["International Cuisine", "Private Dining", "Wine Cellar", "Breakfast & Dinner"],
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
                <path d="M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
            </svg>
        ),
        accentColor: "#c8956a",
    },
    {
        id: 2,
        name: "Fitness & Gym",
        shortName: "Gym",
        floor: "4th Floor",
        tag: "Wellness",
        description:
            "State-of-the-art equipment, personal training suites, and a dedicated yoga studio. Open 24 hours for hotel guests and share owners.",
        details: ["24/7 Access", "Personal Training", "Yoga Studio", "Cardio & Weights"],
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M6.5 6.5h11M6.5 17.5h11M3 10h18M3 14h18" />
                <circle cx="6.5" cy="6.5" r="2" /><circle cx="17.5" cy="6.5" r="2" />
                <circle cx="6.5" cy="17.5" r="2" /><circle cx="17.5" cy="17.5" r="2" />
            </svg>
        ),
        accentColor: "#7a9e7e",
    },
    {
        id: 3,
        name: "Rooftop Pool & Lounge",
        shortName: "Rooftop Pool",
        floor: "32nd Floor",
        tag: "Signature",
        description:
            "An infinity-edge pool perched on the 32nd floor, a private sauna, sun decks with cabanas, and a sky bar serving craft cocktails above the Dhaka skyline.",
        details: ["Infinity Pool", "Sky Bar", "Sun Deck & Cabanas", "Sauna & Steam"],
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M2 12h20M2 16c1.5-1.5 3-2 5-2s3.5.5 5 2 3.5 2 5 2M2 8c1.5 1.5 3 2 5 2s3.5-.5 5-2 3.5-2 5-2" />
            </svg>
        ),
        accentColor: "#6a9bb8",
        featured: true,
    },
    {
        id: 4,
        name: "Medical Centre",
        shortName: "Medical Room",
        floor: "2nd Floor",
        tag: "Healthcare",
        description:
            "An on-site medical room staffed with trained professionals and equipped for emergencies, routine consultations, and first-response care — available around the clock.",
        details: ["24/7 On-call Staff", "Emergency Response", "First Aid", "Routine Consultations"],
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M12 8v8M8 12h8" />
                <rect x="3" y="3" width="18" height="18" rx="3" />
            </svg>
        ),
        accentColor: "#9e8ab8",
    },
    {
        id: 5,
        name: "Basement Parking",
        shortName: "Parking",
        floor: "Basement",
        tag: "Convenience",
        description:
            "Multi-level secured basement parking with automated CCTV surveillance, dedicated EV charging stations, valet service, and 24-hour security.",
        details: ["Valet Service", "EV Charging", "CCTV Surveillance", "24/7 Security"],
        image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                <circle cx="12" cy="14" r="2" />
            </svg>
        ),
        accentColor: "#b8a86a",
    },
];

function useInView(threshold = 0.06) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, inView };
}

export default function HotelFacilities() {
    const { ref, inView } = useInView();
    const [active, setActive] = useState(3); // rooftop default
    const [imageLoaded, setImageLoaded] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    const prevActive = useRef(3);

    const activeFacility = facilities.find((f) => f.id === active)!;

    const switchFacility = useCallback((id: number) => {
        if (id === active) return;
        setTransitioning(true);
        setImageLoaded(false);
        setTimeout(() => {
            setActive(id);
            prevActive.current = id;
            setTransitioning(false);
        }, 350);
    }, [active]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');

        .hf-display { font-family: 'Cormorant Garamond', serif; }
        .hf-ui      { font-family: 'Montserrat', sans-serif; }

        @keyframes hf-fadeUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes hf-fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes hf-lineGrow {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes hf-shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes hf-bgReveal {
          from { opacity:0; transform:scale(1.04); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes hf-slideLeft {
          from { opacity:0; transform:translateX(24px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes hf-slideUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes hf-tagIn {
          from { opacity:0; transform:scale(0.88); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes hf-counterGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(184,154,94,0); }
          50%       { box-shadow: 0 0 0 8px rgba(184,154,94,0.08); }
        }

        .hf-fadeUp    { animation: hf-fadeUp    0.75s ease both; }
        .hf-fadeIn    { animation: hf-fadeIn    0.55s ease both; }
        .hf-lineGrow  { animation: hf-lineGrow  0.85s cubic-bezier(0.77,0,0.18,1) both; transform-origin:left; }
        .hf-bgReveal  { animation: hf-bgReveal  0.7s ease both; }
        .hf-slideLeft { animation: hf-slideLeft 0.5s ease both; }
        .hf-slideUp   { animation: hf-slideUp   0.45s ease both; }
        .hf-tagIn     { animation: hf-tagIn     0.35s cubic-bezier(0.34,1.2,0.64,1) both; }

        .hf-gold-text {
          background: linear-gradient(90deg, #EEA62A 0%, #e8d5a3 45%, #EEA62A 60%, #8a6e3a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: hf-shimmer 4s linear infinite;
        }

        /* BG image layer */
        .hf-bg-img {
          transition: opacity 0.5s ease, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .hf-bg-img.loaded { opacity: 1; }
        .hf-bg-img.fading { opacity: 0; transform: scale(1.03); }

        /* Sidebar nav button */
        .hf-nav-btn {
          transition: all 0.28s cubic-bezier(0.25,0.46,0.45,0.94);
          position: relative;
        }
        .hf-nav-btn::before {
          content: '';
          position: absolute;
          left: 0; top: 50%;
          transform: translateY(-50%) scaleY(0);
          width: 2px;
          height: 60%;
          border-radius: 99px;
          background: var(--accent);
          transition: transform 0.25s ease;
        }
        .hf-nav-btn.active::before { transform: translateY(-50%) scaleY(1); }
        .hf-nav-btn:hover::before  { transform: translateY(-50%) scaleY(0.6); }

        /* Detail pill tags */
        .hf-pill {
          transition: all 0.2s ease;
        }
        .hf-pill:hover {
          transform: translateY(-1px);
        }

        /* Thumb strip */
        .hf-thumb {
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .hf-thumb img {
          transition: transform 0.5s ease;
        }
        .hf-thumb:hover img { transform: scale(1.08); }

        /* Content transition */
        .hf-content-panel {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .hf-content-panel.out {
          opacity: 0;
          transform: translateY(8px);
        }
        .hf-content-panel.in {
          opacity: 1;
          transform: translateY(0);
        }

        .hf-counter-glow { animation: hf-counterGlow 3s ease infinite; }
      `}</style>

            <section
                ref={ref}
                className="hf-ui relative w-full overflow-hidden"
                style={{ minHeight: "100vh" }}
            >
                {/* ── Full-bleed background image ── */}
                <div className="absolute inset-0 z-0">
                    <div
                        key={active}
                        className={`hf-bg-img absolute inset-0 ${imageLoaded ? "loaded" : "opacity-0"} ${transitioning ? "fading" : ""}`}
                    >
                        <img
                            src={activeFacility.image}
                            alt={activeFacility.name}
                            className="w-full h-full object-cover"
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                    {/* Multi-layer overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#080604]/95 via-[#080604]/75 to-[#080604]/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/80 via-transparent to-[#080604]/50" />
                </div>

                {/* Dot pattern overlay */}
                <div
                    className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #EEA62A 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />

                {/* Top rule */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EEA62A]/40 to-transparent z-10" />

                {/* ── Content ── */}
                <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-36">

                    {/* ── Header ── */}
                    <div className="mb-14 lg:mb-16">
                        <div
                            className={`flex items-center gap-3 mb-4 ${inView ? "hf-fadeIn" : "opacity-0"}`}
                            style={{ animationDelay: "0.05s" }}
                        >
                            <span
                                className={`block h-px bg-[#EEA62A] origin-left ${inView ? "hf-lineGrow" : "opacity-0"}`}
                                style={{ width: 36, animationDelay: "0.1s" }}
                            />
                            <span className="text-[#EEA62A] text-[10px] font-semibold tracking-[0.28em] uppercase">
                                World-Class Amenities
                            </span>
                        </div>
                        <h2
                            className={`hf-display text-white font-bold leading-[1.05] ${inView ? "hf-fadeUp" : "opacity-0"}`}
                            style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)", animationDelay: "0.15s" }}
                        >
                            Hotel{" "}
                            <span className="hf-gold-text">Facilities</span>
                        </h2>
                    </div>

                    {/* ── Main Layout: Sidebar + Detail + Thumbs ── */}
                    <div className="grid lg:grid-cols-[220px_1fr] gap-8 xl:gap-12 items-start">

                        {/* Left — Facility Nav */}
                        <nav
                            className={`flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 ${inView ? "hf-fadeUp" : "opacity-0"}`}
                            style={{ animationDelay: "0.3s" }}
                        >
                            {facilities.map((f, i) => {
                                const isActive = active === f.id;
                                return (
                                    <button
                                        key={f.id}
                                        onClick={() => switchFacility(f.id)}
                                        className={`hf-nav-btn flex-shrink-0 lg:flex-shrink text-left pl-4 pr-3 py-3 rounded-xl transition-all
                      ${isActive
                                                ? "bg-white/10 backdrop-blur-sm border border-white/15"
                                                : "hover:bg-white/5"
                                            }`}
                                        style={{ "--accent": f.accentColor } as React.CSSProperties}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <span
                                                className="flex-shrink-0 transition-colors duration-300"
                                                style={{ color: isActive ? f.accentColor : "rgba(255,255,255,0.35)" }}
                                            >
                                                {f.icon}
                                            </span>
                                            <div>
                                                <span
                                                    className={`block text-[11px] font-semibold tracking-wide transition-colors duration-300 whitespace-nowrap
                            ${isActive ? "text-white" : "text-white"}`}
                                                >
                                                    {f.shortName}
                                                </span>
                                                {isActive && (
                                                    <span
                                                        className="block text-[9px] font-medium tracking-[0.14em] mt-0.5"
                                                        style={{ color: f.accentColor }}
                                                    >
                                                        {f.floor}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}

                            {/* Count badge */}
                            <div
                                className="hidden lg:flex items-center gap-2 mt-6 pl-4"
                            >
                                <span
                                    className="hf-counter-glow w-8 h-8 rounded-full border border-[#EEA62A]/40 flex items-center justify-center text-[#EEA62A] text-[11px] font-bold"
                                >
                                    {facilities.length}
                                </span>
                                <span className="text-white/25 text-[10px] font-medium tracking-wide">
                                    Facilities
                                </span>
                            </div>
                        </nav>

                        {/* Right — Detail + Thumbnails */}
                        <div>
                            {/* Detail panel */}
                            <div
                                className={`hf-content-panel ${transitioning ? "out" : "in"} mb-8`}
                            >
                                {/* Tag + floor */}
                                <div className="flex items-center gap-3 mb-5">
                                    <span
                                        className="hf-tagIn px-3 py-1.5 rounded-full text-[9.5px] font-bold tracking-[0.18em] uppercase"
                                        style={{
                                            background: `${activeFacility.accentColor}25`,
                                            color: activeFacility.accentColor,
                                            border: `1px solid ${activeFacility.accentColor}40`,
                                        }}
                                    >
                                        {activeFacility.tag}
                                    </span>
                                    <span className="text-white/30 text-[11px] font-light tracking-wide">
                                        {activeFacility.floor}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3
                                    className="hf-display text-white font-bold leading-[1.05] mb-4"
                                    style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)" }}
                                >
                                    {activeFacility.name}
                                </h3>

                                {/* Description */}
                                <p className="text-white/55 text-[13px] sm:text-[14px] font-light leading-relaxed max-w-xl mb-7">
                                    {activeFacility.description}
                                </p>

                                {/* Detail pills */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {activeFacility.details.map((d, i) => (
                                        <span
                                            key={d}
                                            className="hf-pill flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[10px] font-semibold tracking-wide backdrop-blur-sm"
                                            style={{
                                                background: "rgba(255,255,255,0.07)",
                                                border: "1px solid rgba(255,255,255,0.12)",
                                                color: "rgba(255,255,255,0.75)",
                                                animationDelay: `${i * 0.06}s`,
                                            }}
                                        >
                                            <span
                                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                style={{ background: activeFacility.accentColor }}
                                            />
                                            {d}
                                        </span>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div
                                    className="h-px mb-8"
                                    style={{
                                        background: `linear-gradient(90deg, ${activeFacility.accentColor}50, transparent)`,
                                    }}
                                />
                            </div>

                            {/* Thumbnail strip */}
                            <div
                                className={`${inView ? "hf-fadeUp" : "opacity-0"}`}
                                style={{ animationDelay: "0.5s" }}
                            >
                                <span className="text-white/25 text-[10px] font-semibold tracking-[0.22em] uppercase block mb-4">
                                    All Facilities
                                </span>
                                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                                    {facilities.map((f) => {
                                        const isActive = active === f.id;
                                        return (
                                            <button
                                                key={f.id}
                                                onClick={() => switchFacility(f.id)}
                                                className={`hf-thumb relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all duration-300
                          ${isActive
                                                        ? "scale-105 shadow-lg"
                                                        : "opacity-45 hover:opacity-80 border-transparent"
                                                    }`}
                                                style={{
                                                    borderColor: isActive ? f.accentColor : "transparent",
                                                    boxShadow: isActive ? `0 0 0 1px ${f.accentColor}60, 0 8px 24px rgba(0,0,0,0.4)` : undefined,
                                                }}
                                            >
                                                <img
                                                    src={f.thumb}
                                                    alt={f.name}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                                {/* Thumb overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                                <span className="absolute bottom-1.5 left-0 right-0 text-center text-white text-[8px] font-semibold tracking-wide px-1 leading-tight">
                                                    {f.shortName}
                                                </span>
                                                {/* Active dot */}
                                                {isActive && (
                                                    <span
                                                        className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                                                        style={{ background: f.accentColor }}
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Bottom stat strip ── */}
                    <div
                        className={`mt-16 pt-8 border-t border-white/8 ${inView ? "hf-fadeIn" : "opacity-0"}`}
                        style={{ animationDelay: "0.9s" }}
                    >
                        <div className="flex flex-wrap items-center justify-between gap-6">
                            <div className="flex flex-wrap gap-6 sm:gap-10">
                                {[
                                    { value: "5", label: "Premium Facilities" },
                                    { value: "32F", label: "Rooftop Experience" },
                                    { value: "24/7", label: "Operational Hours" },
                                    { value: "B1–B3", label: "Parking Levels" },
                                ].map((stat) => (
                                    <div key={stat.label} className="flex flex-col">
                                        <span className="hf-display text-white font-bold text-2xl leading-none">
                                            {stat.value}
                                        </span>
                                        <span className="text-white/30 text-[10px] font-medium tracking-wide mt-1">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <span className="text-white/20 text-[11px] tracking-wide">
                                Times Square · Tejgaon, Dhaka
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom rule */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EEA62A]/30 to-transparent z-10" />
            </section>
        </>
    );
}