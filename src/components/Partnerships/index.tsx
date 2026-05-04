"use client";

import { useEffect, useRef, useState } from "react";

const partners = [
    {
        id: 1,
        role: "Design & Consultancy",
        name: "Headroom",
        description:
            "Award-winning architectural and interior design firm behind the spatial vision of Times Square — from structural concept to bespoke interior detailing.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Headroom_logo.svg/320px-Headroom_logo.svg.png",
        logoFallback: null,
        accent: "#e07820",
        tag: "Architecture",
        since: "Est. 1998",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        stats: [{ label: "Projects", value: "200+" }, { label: "Years", value: "25+" }],
    },
    {
        id: 2,
        role: "Construction Partner",
        name: "China State Construction",
        description:
            "One of the world's largest construction conglomerates, bringing world-class engineering precision, international grade materials, and unmatched structural execution.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/China_State_Construction_Engineering_Corporation_logo.svg/320px-China_State_Construction_Engineering_Corporation_logo.svg.png",
        logoFallback: null,
        accent: "#1a6eb5",
        tag: "Engineering",
        since: "Est. 1957",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="2" y="7" width="20" height="14" rx="1" />
                <path d="M16 7V5a2 2 0 00-4 0v2M8 7V5a2 2 0 00-4 0v2M12 12v5M9.5 14.5h5" />
            </svg>
        ),
        stats: [{ label: "Countries", value: "100+" }, { label: "Projects", value: "10K+" }],
        featured: true,
    },
    {
        id: 3,
        role: "Joint-Venture Partner",
        name: "Asiatic Laboratories",
        description:
            "A leading Bangladeshi conglomerate with deep roots in healthcare, hospitality, and real estate — anchoring the local expertise and operational excellence of the project.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Asiatic_Laboratories_Ltd_Logo.png/320px-Asiatic_Laboratories_Ltd_Logo.png",
        logoFallback: null,
        accent: "#EEA62A",
        tag: "Hospitality",
        since: "Est. 1972",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
        stats: [{ label: "Brands", value: "12+" }, { label: "Years", value: "50+" }],
    },
];

// Partner logo display names as SVG text fallbacks
const logoTextMap: Record<number, { lines: string[]; color: string }> = {
    1: { lines: ["headroom"], color: "#e07820" },
    2: { lines: ["中國建築", "CHINA STATE", "CONSTRUCTION"], color: "#1a6eb5" },
    3: { lines: ["Asiatic", "Laboratories Ltd."], color: "#c0392b" },
};

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

function LogoBox({ partner, hovered }: { partner: typeof partners[0]; hovered: boolean }) {
    const [imgError, setImgError] = useState(false);
    const text = logoTextMap[partner.id];

    if (imgError || !partner.logo) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-1 px-4">
                {text.lines.map((line, i) => (
                    <span
                        key={i}
                        className="font-bold leading-tight text-center"
                        style={{
                            color: hovered ? text.color : "#9c8f84",
                            fontSize: i === 0 ? "1.1rem" : "0.7rem",
                            transition: "color 0.3s ease",
                            fontFamily: i === 0 ? "'Cormorant Garamond', serif" : "'Montserrat', sans-serif",
                            letterSpacing: i > 0 ? "0.08em" : "0",
                        }}
                    >
                        {line}
                    </span>
                ))}
            </div>
        );
    }

    return (
        <img
            src={partner.logo}
            alt={partner.name}
            className="w-full h-full object-contain p-5"
            style={{
                filter: hovered ? "none" : "grayscale(100%) opacity(0.4)",
                transition: "filter 0.4s ease",
            }}
            onError={() => setImgError(true)}
        />
    );
}

export default function Partnerships() {
    const { ref, inView } = useInView();
    const [hovered, setHovered] = useState<number | null>(null);
    const [active, setActive] = useState<number | null>(null);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');

        .ps-display { font-family: 'Cormorant Garamond', serif; }
        .ps-ui      { font-family: 'Montserrat', sans-serif; }

        @keyframes ps-fadeUp {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes ps-fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes ps-lineGrow {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes ps-shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes ps-cardIn {
          from { opacity:0; transform:translateY(24px) scale(0.98); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes ps-rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ps-connectorPulse {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.5; }
        }

        .ps-fadeUp   { animation: ps-fadeUp   0.75s ease both; }
        .ps-fadeIn   { animation: ps-fadeIn   0.55s ease both; }
        .ps-lineGrow { animation: ps-lineGrow 0.85s cubic-bezier(0.77,0,0.18,1) both; transform-origin:left; }
        .ps-cardIn   { animation: ps-cardIn   0.65s cubic-bezier(0.25,0.46,0.45,0.94) both; }

        .ps-gold-text {
          background: linear-gradient(90deg,#EEA62A 0%,#e8d5a3 45%,#EEA62A 60%,#8a6e3a 100%);
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: ps-shimmer 4s linear infinite;
        }

        .ps-card {
          transition: all 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: default;
        }
        .ps-card:hover {
          transform: translateY(-8px);
        }
        .ps-card.ps-featured {
          transform: translateY(-6px);
        }
        .ps-card.ps-featured:hover {
          transform: translateY(-14px);
        }

        .ps-logo-box {
          transition: all 0.35s ease;
        }

        .ps-stat-row {
          transition: background 0.2s ease;
        }
        .ps-stat-row:hover {
          background: rgba(184,154,94,0.04);
        }

        .ps-connector {
          animation: ps-connectorPulse 3s ease infinite;
        }

        .ps-orbit {
          animation: ps-rotateSlow 20s linear infinite;
        }

        .ps-tag {
          transition: all 0.22s ease;
        }
      `}</style>

            <section
                ref={ref}
                className="ps-ui relative w-full bg-white overflow-hidden py-24 lg:py-36"
            >
                {/* Dot texture */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #EEA62A 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EEA62A]/30 to-transparent" />

                {/* Decorative large circle — bg element */}
                <div
                    className="absolute right-[-200px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#EEA62A]/06 pointer-events-none"
                    style={{ borderWidth: "1px" }}
                />
                <div
                    className="absolute right-[-160px] top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-[#EEA62A]/04 pointer-events-none"
                />

                <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

                    {/* ── Header ── */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20">
                        <div>
                            <div
                                className={`flex items-center gap-3 mb-4 ${inView ? "ps-fadeIn" : "opacity-0"}`}
                                style={{ animationDelay: "0.05s" }}
                            >
                                <span
                                    className={`block h-px bg-[#EEA62A] origin-left ${inView ? "ps-lineGrow" : "opacity-0"}`}
                                    style={{ width: 36, animationDelay: "0.1s" }}
                                />
                                <span className="text-[#EEA62A] text-[10px] font-semibold tracking-[0.28em] uppercase">
                                    Strategic Alliances
                                </span>
                            </div>
                            <h2
                                className={`ps-display text-[#1a1612] font-bold leading-[1.05] ${inView ? "ps-fadeUp" : "opacity-0"}`}
                                style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)", animationDelay: "0.15s" }}
                            >
                                Our{" "}
                                <span className="ps-gold-text">Partnerships</span>
                            </h2>
                            <p
                                className={`text-gray-900 text-[13px] font-light tracking-wide mt-3 max-w-md ${inView ? "ps-fadeUp" : "opacity-0"}`}
                                style={{ animationDelay: "0.25s" }}
                            >
                                Times Square is built on world-class expertise — global leaders in design, engineering, and hospitality united for a singular vision.
                            </p>
                        </div>

                        {/* Partner count badge */}
                        <div
                            className={`inline-flex flex-col items-center justify-center border border-[#EEA62A]/30 rounded-2xl px-8 py-5 bg-gradient-to-br from-[#fdf9f3] to-white flex-shrink-0 ${inView ? "ps-fadeIn" : "opacity-0"}`}
                            style={{ animationDelay: "0.35s" }}
                        >
                            <span className="ps-display text-[#EEA62A] font-bold text-4xl leading-none">3</span>
                            <span className="text-gray-900 text-[10px] font-semibold tracking-[0.2em] uppercase mt-1">Partners</span>
                            <div className="w-8 h-px bg-[#EEA62A]/30 my-2" />
                            <span className="text-gray-900 text-[10px] font-medium tracking-wide">World-Class</span>
                        </div>
                    </div>

                    {/* ── Partnership Cards ── */}
                    <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 mb-16">
                        {partners.map((partner, i) => {
                            const isHovered = hovered === partner.id;
                            return (
                                <div
                                    key={partner.id}
                                    onMouseEnter={() => setHovered(partner.id)}
                                    onMouseLeave={() => setHovered(null)}
                                    className={`ps-card relative rounded-2xl border overflow-hidden bg-white group
                    ${partner.featured
                                            ? "border-[#EEA62A]/50 shadow-[0_20px_70px_rgba(184,154,94,0.15)] ps-featured"
                                            : "border-[#e8e2da] hover:border-[#EEA62A]/35 hover:shadow-[0_12px_50px_rgba(184,154,94,0.1)]"
                                        }
                    ${inView ? "ps-cardIn" : "opacity-0"}
                  `}
                                    style={{ animationDelay: `${0.4 + i * 0.12}s` }}
                                >
                                    {/* Top accent stripe */}
                                    <div
                                        className="h-[3px] w-full transition-all duration-500"
                                        style={{
                                            background: isHovered
                                                ? `linear-gradient(90deg, ${partner.accent}88, ${partner.accent})`
                                                : `linear-gradient(90deg, ${partner.accent}30, ${partner.accent}50)`,
                                        }}
                                    />

                                    {/* Featured glow */}
                                    {partner.featured && (
                                        <div
                                            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-[0.18em] uppercase z-10"
                                            style={{
                                                background: `${partner.accent}15`,
                                                color: partner.accent,
                                                border: `1px solid ${partner.accent}35`,
                                            }}
                                        >
                                            Lead Partner
                                        </div>
                                    )}

                                    {/* Logo area */}
                                    <div
                                        className="ps-logo-box relative h-36 flex items-center justify-center border-b transition-all duration-350"
                                        style={{
                                            background: isHovered
                                                ? `linear-gradient(135deg, ${partner.accent}08, ${partner.accent}04)`
                                                : "linear-gradient(135deg, #faf8f5, #fff)",
                                            borderColor: isHovered ? `${partner.accent}20` : "#f0ebe4",
                                        }}
                                    >
                                        {/* Subtle corner decorations */}
                                        <div
                                            className="absolute top-3 left-3 w-4 h-4 border-t border-l rounded-tl-sm transition-colors duration-300"
                                            style={{ borderColor: isHovered ? `${partner.accent}50` : "transparent" }}
                                        />
                                        <div
                                            className="absolute bottom-3 right-3 w-4 h-4 border-b border-r rounded-br-sm transition-colors duration-300"
                                            style={{ borderColor: isHovered ? `${partner.accent}50` : "transparent" }}
                                        />

                                        <div className="w-40 h-20">
                                            <LogoBox partner={partner} hovered={isHovered} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 sm:p-6">
                                        {/* Role + tag row */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-300"
                                                    style={{
                                                        background: isHovered ? `${partner.accent}18` : "#f5f0eb",
                                                        color: isHovered ? partner.accent : "#a09080",
                                                    }}
                                                >
                                                    {partner.icon}
                                                </span>
                                                <span
                                                    className="ps-tag text-[9px] font-bold tracking-[0.18em] uppercase"
                                                    style={{ color: partner.accent }}
                                                >
                                                    {partner.tag}
                                                </span>
                                            </div>
                                            <span className="text-[#c8bdb4] text-[9px] font-light tracking-wide">{partner.since}</span>
                                        </div>

                                        {/* Role label */}
                                        <p className="text-gray-900 text-[10px] font-semibold tracking-[0.16em] uppercase mb-1">
                                            {partner.role}
                                        </p>

                                        {/* Name */}
                                        <h3 className="ps-display text-[#1a1612] font-bold text-[1.3rem] leading-tight mb-3">
                                            {partner.name}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-[#7a6e65] text-[11.5px] font-light leading-relaxed mb-5">
                                            {partner.description}
                                        </p>

                                        {/* Divider */}
                                        <div
                                            className="h-px mb-4 transition-all duration-300"
                                            style={{
                                                background: isHovered
                                                    ? `linear-gradient(90deg, ${partner.accent}40, transparent)`
                                                    : "#f0ebe4",
                                            }}
                                        />

                                        {/* Stats */}
                                        <div className="grid grid-cols-2 gap-2">
                                            {partner.stats.map((stat) => (
                                                <div
                                                    key={stat.label}
                                                    className="ps-stat-row rounded-xl px-3 py-2.5 border border-[#f0ebe4]"
                                                    style={{ background: isHovered ? `${partner.accent}06` : "#faf8f5" }}
                                                >
                                                    <span
                                                        className="ps-display font-bold text-[1.25rem] leading-none block transition-colors duration-300"
                                                        style={{ color: isHovered ? partner.accent : "#1a1612" }}
                                                    >
                                                        {stat.value}
                                                    </span>
                                                    <span className="text-[#a09080] text-[9px] font-medium tracking-wide mt-0.5 block">
                                                        {stat.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ── Connection Visual Strip ── */}
                    <div
                        className={`relative mb-16 ${inView ? "ps-fadeIn" : "opacity-0"}`}
                        style={{ animationDelay: "0.8s" }}
                    >
                        <div className="flex items-center justify-center gap-0">
                            {partners.map((p, i) => (
                                <div key={p.id} className="flex items-center">
                                    {/* Node */}
                                    <div className="flex flex-col items-center gap-2">
                                        <div
                                            className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                                            style={{
                                                borderColor: hovered === p.id ? p.accent : `${p.accent}40`,
                                                background: hovered === p.id ? `${p.accent}15` : `${p.accent}08`,
                                                color: hovered === p.id ? p.accent : `${p.accent}70`,
                                                transform: hovered === p.id ? "scale(1.2)" : "scale(1)",
                                            }}
                                        >
                                            {p.icon}
                                        </div>
                                        <span
                                            className="text-[9px] font-semibold tracking-[0.12em] uppercase text-center max-w-[80px] leading-tight"
                                            style={{ color: hovered === p.id ? p.accent : "#b3a89e" }}
                                        >
                                            {p.name.split(" ")[0]}
                                        </span>
                                    </div>

                                    {/* Connector line */}
                                    {i < partners.length - 1 && (
                                        <div className="flex items-center mx-2 sm:mx-4">
                                            <div className="flex items-center gap-1">
                                                {[...Array(6)].map((_, di) => (
                                                    <div
                                                        key={di}
                                                        className="ps-connector rounded-full"
                                                        style={{
                                                            width: "3px",
                                                            height: "3px",
                                                            background: "#EEA62A",
                                                            animationDelay: `${di * 0.2}s`,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            {/* Central hub */}
                                            <div className="mx-2 sm:mx-3 w-6 h-6 rounded-full border border-[#EEA62A]/40 bg-[#EEA62A]/08 flex items-center justify-center flex-shrink-0">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#EEA62A]/60" />
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {[...Array(6)].map((_, di) => (
                                                    <div
                                                        key={di}
                                                        className="ps-connector rounded-full"
                                                        style={{
                                                            width: "3px",
                                                            height: "3px",
                                                            background: "#EEA62A",
                                                            animationDelay: `${(di + 3) * 0.2}s`,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Quote / Mission Statement ── */}
                    <div
                        className={`relative rounded-3xl border border-[#e8e2da] overflow-hidden p-8 sm:p-10 lg:p-14 bg-gradient-to-br from-[#fdf9f3] to-white ${inView ? "ps-fadeUp" : "opacity-0"}`}
                        style={{ animationDelay: "0.9s" }}
                    >
                        {/* Corner accent */}
                        <div className="absolute top-0 left-0 w-16 h-16">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#EEA62A] to-transparent" />
                            <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-[#EEA62A] to-transparent" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-16 h-16">
                            <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#EEA62A] to-transparent" />
                            <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-[#EEA62A] to-transparent" />
                        </div>

                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                            {/* Large quote mark */}
                            <div className="ps-display text-[#EEA62A]/15 font-bold leading-none flex-shrink-0 select-none"
                                style={{ fontSize: "7rem", lineHeight: 0.8, marginTop: "-8px" }}>
                                "
                            </div>

                            <div className="flex-1">
                                <p className="ps-display text-[#1a1612] font-medium leading-relaxed mb-4"
                                    style={{ fontSize: "clamp(1.1rem, 2vw, 1.45rem)" }}>
                                    Three world-class organisations. One shared ambition — to deliver a landmark that redefines
                                    the standard for commercial and hospitality excellence in Dhaka.
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="h-px w-8 bg-[#EEA62A]" />
                                    <span className="text-gray-900 text-[11px] font-semibold tracking-[0.2em] uppercase">
                                        Times Square · Tejgaon, Dhaka
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Bottom strip ── */}
                    <div
                        className={`flex flex-wrap items-center justify-between gap-4 mt-14 pt-10 border-t border-[#f0ebe4] ${inView ? "ps-fadeIn" : "opacity-0"}`}
                        style={{ animationDelay: "1s" }}
                    >
                        <div className="flex flex-wrap gap-6">
                            {partners.map((p) => (
                                <div key={p.id} className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full" style={{ background: p.accent }} />
                                    <span className="text-gray-900 text-[11px] font-medium">{p.name}</span>
                                    <span className="text-[#d6cfc8] text-[11px]">·</span>
                                    <span className="text-[#b3a89e] text-[11px] font-light">{p.role}</span>
                                </div>
                            ))}
                        </div>
                        <span className="text-[#c8bdb4] text-[11px] tracking-wide">Times Square · Tejgaon, Dhaka</span>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EEA62A]/25 to-transparent" />
            </section>
        </>
    );
}