"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const roomTypes = [
    {
        id: 1,
        type: "Suite",
        size: 940,
        label: "The Pinnacle Suite",
        floors: "26th – 31st Floor",
        tagline: "Unrivalled space, unrivalled presence",
        features: ["King Bed", "Living Area", "Panoramic View", "Walk-in Closet", "Luxury Bath"],
        accent: "#EEA62A",
        badge: "Signature",
        description:
            "Our crown jewel. Expansive living quarters with floor-to-ceiling glass, handcrafted furnishings, and a private dining alcove — curated for the most discerning guests.",
        gradient: "from-[#f5f0e8] to-[#fdf9f3]",
        icon: "◆",
    },
    {
        id: 2,
        type: "Deluxe",
        size: 682,
        label: "Grand Deluxe",
        floors: "26th – 31st Floor",
        tagline: "Elevated comfort, refined detail",
        features: ["King Bed", "City View", "Work Desk", "Rain Shower", "Mini Bar"],
        accent: "#8a6e3a",
        badge: "Premium",
        description:
            "Generous proportions meet artisanal detail. The Grand Deluxe is a sanctuary of calm — warm textures, ambient lighting, and every amenity placed with intention.",
        gradient: "from-[#f0ede8] to-[#faf8f4]",
        icon: "▲",
    },
    {
        id: 3,
        type: "Deluxe",
        size: 644,
        label: "Classic Deluxe",
        floors: "26th – 31st Floor",
        tagline: "Timeless luxury at every turn",
        features: ["Queen Bed", "City View", "Work Desk", "Rainfall Shower", "Minibar"],
        accent: "#6b7c5e",
        badge: "Superior",
        description:
            "Refined comfort wrapped in bespoke design. The Classic Deluxe balances space and intimacy — ideal for extended stays or executive retreats.",
        gradient: "from-[#edf0eb] to-[#f8faf6]",
        icon: "●",
    },
    {
        id: 4,
        type: "Double Single",
        size: 522,
        label: "Double Single",
        floors: "26th – 31st Floor",
        tagline: "Smart design, full comfort",
        features: ["Twin Beds", "City View", "Work Desk", "Shower", "Wardrobe"],
        accent: "#7a8fa6",
        badge: "Comfort",
        description:
            "Thoughtfully configured for flexibility. Two premium single beds, intelligent storage, and a calm palette make this room perfect for colleagues or companions.",
        gradient: "from-[#eaecf0] to-[#f6f7fa]",
        icon: "■",
    },
];

function useInView(threshold = 0.08) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) { setInView(true); obs.disconnect(); }
            },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, inView };
}

export default function HotelRoomTypes() {
    const { ref, inView } = useInView(0.05);
    const [activeRoom, setActiveRoom] = useState<number>(1);
    const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);
    const [animating, setAnimating] = useState(false);

    const active = roomTypes.find((r) => r.id === activeRoom)!;

    const switchRoom = useCallback((id: number) => {
        if (id === activeRoom) return;
        setAnimating(true);
        setTimeout(() => {
            setActiveRoom(id);
            setAnimating(false);
        }, 220);
    }, [activeRoom]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');

        .rt-display { font-family: 'Cormorant Garamond', serif; }
        .rt-ui      { font-family: 'Montserrat', sans-serif; }

        @keyframes rt-fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rt-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes rt-lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes rt-slideRight {
          from { opacity: 0; transform: translateX(-18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes rt-contentFade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rt-numberCount {
          from { opacity: 0; transform: translateY(12px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes rt-barFill {
          from { width: 0; }
          to   { width: var(--bar-w); }
        }
        @keyframes rt-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes rt-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }

        .rt-fadeUp    { animation: rt-fadeUp    0.75s ease both; }
        .rt-fadeIn    { animation: rt-fadeIn    0.55s ease both; }
        .rt-lineGrow  { animation: rt-lineGrow  0.85s cubic-bezier(0.77,0,0.18,1) both; transform-origin: left; }
        .rt-slideRight{ animation: rt-slideRight 0.6s ease both; }
        .rt-content   { animation: rt-contentFade 0.35s ease both; }
        .rt-number    { animation: rt-numberCount 0.4s cubic-bezier(0.34,1.2,0.64,1) both; }

        .rt-gold-text {
          background: linear-gradient(90deg, #EEA62A 0%, #e8d5a3 45%, #EEA62A 60%, #8a6e3a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: rt-shimmer 4s linear infinite;
        }

        .rt-card {
          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
        }
        .rt-card:hover { transform: translateY(-3px); }
        .rt-card.rt-active { transform: translateY(-4px); }

        .rt-feature-tag {
          transition: all 0.2s ease;
        }
        .rt-feature-tag:hover {
          transform: translateY(-1px);
        }

        .rt-size-bar {
          transition: width 0.6s cubic-bezier(0.77,0,0.18,1);
        }

        .rt-selector-btn {
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .rt-selector-btn::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          width: 0;
          transition: width 0.3s ease;
        }
        .rt-selector-btn.rt-sel-active::after {
          width: 100%;
        }

        .rt-floor-badge {
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.02) 2px,
            rgba(0,0,0,0.02) 4px
          );
        }

        .rt-detail-panel {
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .rt-detail-panel.fading {
          opacity: 0;
          transform: translateY(6px);
        }
        .rt-detail-panel.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

            <section
                ref={ref}
                className="rt-ui relative w-full bg-white overflow-hidden py-24 lg:py-36"
            >
                {/* Subtle top rule */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EEA62A]/30 to-transparent" />

                {/* Background texture — very subtle dot grid */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.035]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #EEA62A 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />

                <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

                    {/* ── Header ── */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20">
                        <div>
                            <div
                                className={`flex items-center gap-3 mb-4 ${inView ? "rt-fadeIn" : "opacity-0"}`}
                                style={{ animationDelay: "0.05s" }}
                            >
                                <span
                                    className={`block h-px bg-[#EEA62A] origin-left ${inView ? "rt-lineGrow" : "opacity-0"}`}
                                    style={{ width: 36, animationDelay: "0.1s" }}
                                />
                                <span className="text-[#EEA62A] text-[10px] font-semibold tracking-[0.28em] uppercase">
                                    Accommodation
                                </span>
                            </div>
                            <h2
                                className={`rt-display text-[#1a1612] font-bold leading-[1.05] ${inView ? "rt-fadeUp" : "opacity-0"}`}
                                style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)", animationDelay: "0.15s" }}
                            >
                                Hotel{" "}
                                <span className="rt-gold-text">Room Types</span>
                            </h2>
                            <p
                                className={`text-gray-900 text-[13px] font-light tracking-wide mt-3 max-w-sm ${inView ? "rt-fadeUp" : "opacity-0"}`}
                                style={{ animationDelay: "0.25s" }}
                            >
                                26th – 31st Floor · 4 curated room categories
                            </p>
                        </div>

                        {/* Floor badge */}
                        <div
                            className={`rt-floor-badge inline-flex flex-col items-center justify-center border border-[#EEA62A]/30 rounded-2xl px-8 py-5 ${inView ? "rt-fadeIn" : "opacity-0"}`}
                            style={{ animationDelay: "0.35s" }}
                        >
                            <span className="rt-display text-[#EEA62A] font-bold text-4xl leading-none">6</span>
                            <span className="text-gray-900 text-[10px] font-semibold tracking-[0.2em] uppercase mt-1">Floors</span>
                            <div className="w-8 h-px bg-[#EEA62A]/30 my-2" />
                            <span className="text-gray-900 text-[10px] font-medium tracking-wide">26 – 31</span>
                        </div>
                    </div>

                    {/* ── Main Layout ── */}
                    <div className="grid lg:grid-cols-[1fr_380px] gap-10 xl:gap-16 items-start">

                        {/* Left — Card Grid */}
                        <div>
                            {/* Size comparison bar legend */}
                            <div
                                className={`flex items-center gap-2 mb-8 ${inView ? "rt-fadeIn" : "opacity-0"}`}
                                style={{ animationDelay: "0.4s" }}
                            >
                                <span className="text-[#b3a89e] text-[10px] font-semibold tracking-[0.2em] uppercase">Size Scale</span>
                                <div className="flex-1 h-px bg-[#e8e0d8]" />
                                <span className="text-[#b3a89e] text-[10px]">940 sft max</span>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                                {roomTypes.map((room, i) => {
                                    const isActive = activeRoom === room.id;
                                    const barWidth = Math.round((room.size / 940) * 100);

                                    return (
                                        <div
                                            key={room.id}
                                            onClick={() => switchRoom(room.id)}
                                            onMouseEnter={() => setHoveredRoom(room.id)}
                                            onMouseLeave={() => setHoveredRoom(null)}
                                            className={`rt-card relative rounded-2xl border p-5 sm:p-6 bg-white
                        ${isActive
                                                    ? "border-[#EEA62A]/60 shadow-[0_8px_40px_rgba(184,154,94,0.15)]"
                                                    : "border-[#e8e2da] hover:border-[#EEA62A]/30 hover:shadow-[0_4px_20px_rgba(184,154,94,0.08)]"
                                                }
                        ${inView ? "rt-fadeUp" : "opacity-0"}
                        ${isActive ? "rt-active" : ""}
                      `}
                                            style={{ animationDelay: `${0.45 + i * 0.08}s` }}
                                        >
                                            {/* Active indicator line */}
                                            {isActive && (
                                                <div
                                                    className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full"
                                                    style={{ background: room.accent }}
                                                />
                                            )}

                                            {/* Top row */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-2.5">
                                                    <span
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-bold"
                                                        style={{
                                                            background: isActive ? `${room.accent}18` : "#f5f0eb",
                                                            color: isActive ? room.accent : "#a09080",
                                                        }}
                                                    >
                                                        {room.icon}
                                                    </span>
                                                    <div>
                                                        <span
                                                            className="text-[9px] font-bold tracking-[0.18em] uppercase block"
                                                            style={{ color: room.accent }}
                                                        >
                                                            {room.badge}
                                                        </span>
                                                        <span className="text-[#1a1612] text-[12px] font-semibold tracking-wide">
                                                            {room.type}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Size number */}
                                                <div className="text-right">
                                                    <span
                                                        className="rt-display font-bold leading-none block"
                                                        style={{
                                                            fontSize: "1.65rem",
                                                            color: isActive ? room.accent : "#c8bdb4",
                                                        }}
                                                    >
                                                        {room.size}
                                                    </span>
                                                    <span className="text-[#a09080] text-[10px] font-medium tracking-wide">sft</span>
                                                </div>
                                            </div>

                                            {/* Room name */}
                                            <h3 className="rt-display text-[#1a1612] font-semibold text-[1.25rem] leading-tight mb-1">
                                                {room.label}
                                            </h3>
                                            <p className="text-gray-900 text-[11px] font-light italic mb-4">
                                                {room.tagline}
                                            </p>

                                            {/* Size bar */}
                                            <div className="mb-4">
                                                <div className="h-1 bg-[#f0ebe4] rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full transition-all duration-700"
                                                        style={{
                                                            width: isActive || hoveredRoom === room.id ? `${barWidth}%` : "0%",
                                                            background: `linear-gradient(90deg, ${room.accent}88, ${room.accent})`,
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Feature tags */}
                                            <div className="flex flex-wrap gap-1.5">
                                                {room.features.slice(0, 3).map((f) => (
                                                    <span
                                                        key={f}
                                                        className="rt-feature-tag px-2.5 py-1 rounded-full text-[9.5px] font-semibold tracking-[0.1em] uppercase"
                                                        style={{
                                                            background: isActive ? `${room.accent}12` : "#f5f1ec",
                                                            color: isActive ? room.accent : "#9c8f84",
                                                        }}
                                                    >
                                                        {f}
                                                    </span>
                                                ))}
                                                {room.features.length > 3 && (
                                                    <span className="px-2.5 py-1 rounded-full text-[9.5px] font-medium text-[#b3a89e] bg-[#f5f1ec]">
                                                        +{room.features.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right — Detail Panel */}
                        <div
                            className={`lg:sticky lg:top-8 ${inView ? "rt-fadeUp" : "opacity-0"}`}
                            style={{ animationDelay: "0.6s" }}
                        >
                            <div
                                className={`rt-detail-panel rounded-3xl border border-[#e8e2da] overflow-hidden shadow-[0_12px_60px_rgba(0,0,0,0.06)] ${animating ? "fading" : "visible"}`}
                            >
                                {/* Top gradient banner */}
                                <div
                                    className={`h-48 bg-gradient-to-br ${active.gradient} relative flex items-center justify-center border-b border-[#e8e2da]`}
                                >
                                    {/* Decorative floor plan silhouette */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
                                        <svg width="180" height="130" viewBox="0 0 180 130" fill="none">
                                            <rect x="10" y="10" width="160" height="110" rx="4" stroke="#5a4a3a" strokeWidth="2.5" fill="none" />
                                            <rect x="10" y="10" width="75" height="50" rx="2" stroke="#5a4a3a" strokeWidth="1.5" fill="none" />
                                            <rect x="95" y="10" width="75" height="50" rx="2" stroke="#5a4a3a" strokeWidth="1.5" fill="none" />
                                            <rect x="10" y="70" width="75" height="50" rx="2" stroke="#5a4a3a" strokeWidth="1.5" fill="none" />
                                            <rect x="95" y="70" width="75" height="50" rx="2" stroke="#5a4a3a" strokeWidth="1.5" fill="none" />
                                            <line x1="47" y1="10" x2="47" y2="60" stroke="#5a4a3a" strokeWidth="1" strokeDasharray="3 3" />
                                            <line x1="132" y1="10" x2="132" y2="60" stroke="#5a4a3a" strokeWidth="1" strokeDasharray="3 3" />
                                            <circle cx="47" cy="35" r="12" stroke="#5a4a3a" strokeWidth="1.2" fill="none" />
                                            <circle cx="132" cy="35" r="12" stroke="#5a4a3a" strokeWidth="1.2" fill="none" />
                                        </svg>
                                    </div>

                                    {/* Large icon */}
                                    <div className="relative flex flex-col items-center gap-2">
                                        <span
                                            className="text-5xl font-black opacity-20"
                                            style={{ color: active.accent }}
                                        >
                                            {active.icon}
                                        </span>
                                        <span
                                            className="rt-display font-bold italic text-3xl"
                                            style={{ color: active.accent }}
                                        >
                                            {active.size} <span className="text-lg font-normal not-italic">sft</span>
                                        </span>
                                    </div>

                                    {/* Badge */}
                                    <div
                                        className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[9px] font-bold tracking-[0.18em] uppercase"
                                        style={{ background: `${active.accent}20`, color: active.accent, border: `1px solid ${active.accent}40` }}
                                    >
                                        {active.badge}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 sm:p-7 bg-white">
                                    <div className="flex items-start justify-between mb-1">
                                        <h3 className="rt-display text-[#1a1612] font-bold text-2xl leading-tight">
                                            {active.label}
                                        </h3>
                                    </div>
                                    <p className="text-gray-900 text-[11px] font-light italic mb-4">{active.tagline}</p>

                                    {/* Divider */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="h-px flex-1 bg-[#f0ebe4]" />
                                        <span style={{ color: active.accent }} className="text-[10px] tracking-[0.2em] uppercase font-semibold">
                                            Details
                                        </span>
                                        <div className="h-px flex-1 bg-[#f0ebe4]" />
                                    </div>

                                    {/* Description */}
                                    <p className="text-[#5c524a] text-[13px] font-light leading-relaxed mb-6">
                                        {active.description}
                                    </p>

                                    {/* Stats row */}
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        <div className="rounded-xl bg-[#faf7f3] border border-[#f0ebe4] px-4 py-3">
                                            <span className="text-[#a09080] text-[9px] font-semibold tracking-[0.18em] uppercase block mb-1">Size</span>
                                            <span className="rt-display font-bold text-[1.4rem] text-[#1a1612]">{active.size}</span>
                                            <span className="text-gray-900 text-[10px] ml-1">sft</span>
                                        </div>
                                        <div className="rounded-xl bg-[#faf7f3] border border-[#f0ebe4] px-4 py-3">
                                            <span className="text-[#a09080] text-[9px] font-semibold tracking-[0.18em] uppercase block mb-1">Floors</span>
                                            <span className="rt-display font-bold text-[1.1rem] text-[#1a1612] leading-tight">26 – 31</span>
                                        </div>
                                    </div>

                                    {/* All features */}
                                    <div className="mb-6">
                                        <span className="text-[#a09080] text-[9px] font-semibold tracking-[0.18em] uppercase block mb-3">Inclusions</span>
                                        <div className="flex flex-wrap gap-2">
                                            {active.features.map((f) => (
                                                <span
                                                    key={f}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wide"
                                                    style={{ background: `${active.accent}12`, color: active.accent }}
                                                >
                                                    <span className="w-1 h-1 rounded-full inline-block" style={{ background: active.accent }} />
                                                    {f}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <a
                                        href="#contact"
                                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[11px] font-bold tracking-[0.16em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                                        style={{
                                            background: `linear-gradient(135deg, ${active.accent}, #8a6e3a)`,
                                            color: "#fff",
                                            boxShadow: `0 4px 20px ${active.accent}40`,
                                        }}
                                    >
                                        Enquire About This Room
                                        <span>→</span>
                                    </a>
                                </div>
                            </div>

                            {/* Room selector mini tabs */}
                            <div className="flex items-center justify-center gap-2 mt-5">
                                {roomTypes.map((r) => (
                                    <button
                                        key={r.id}
                                        onClick={() => switchRoom(r.id)}
                                        className="w-2 h-2 rounded-full transition-all duration-300"
                                        style={{
                                            background: activeRoom === r.id ? r.accent : "#d6cfc8",
                                            width: activeRoom === r.id ? "24px" : "8px",
                                            borderRadius: "99px",
                                        }}
                                        aria-label={r.label}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Bottom summary strip ── */}
                    <div
                        className={`mt-16 pt-10 border-t border-[#f0ebe4] ${inView ? "rt-fadeUp" : "opacity-0"}`}
                        style={{ animationDelay: "1s" }}
                    >
                        <div className="flex flex-wrap items-center justify-between gap-6">
                            <div className="flex flex-wrap gap-8">
                                {roomTypes.map((r) => (
                                    <button
                                        key={r.id}
                                        onClick={() => switchRoom(r.id)}
                                        className="flex items-center gap-2.5 group"
                                    >
                                        <span
                                            className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-150"
                                            style={{ background: r.accent }}
                                        />
                                        <span className="text-gray-900 text-[11px] font-medium group-hover:text-[#1a1612] transition-colors duration-200">
                                            {r.size} sft
                                        </span>
                                        <span className="text-[#c8bdb4] text-[11px]">·</span>
                                        <span className="text-gray-900 text-[11px] font-light group-hover:text-[#6b5e52] transition-colors duration-200">
                                            {r.type}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            <span className="text-[#c8bdb4] text-[11px] font-medium tracking-wide">
                                Times Square, Tejgaon · Dhaka
                            </span>
                        </div>
                    </div>

                </div>

                {/* Bottom glow rule */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EEA62A]/25 to-transparent" />
            </section>
        </>
    );
}