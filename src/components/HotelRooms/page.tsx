"use client";

import { useEffect, useRef, useState } from "react";
import { MdOutlineHotel, MdOutlineKingBed } from "react-icons/md";
import { TbBed } from "react-icons/tb";
import { BsCheckCircle, BsStarFill } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import { LuBuilding2 } from "react-icons/lu";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineBed } from "react-icons/md";

const roomTypes = [
    {
        id: 1,
        name: "Deluxe Room",
        icon: () => <MdOutlineBed size={32} />,
        tag: "Most Popular",
        accent: false,
    },
    {
        id: 2,
        name: "Standard Room",
        icon: () => <TbBed size={32} />,
        tag: "Best Value",
        accent: false,
    },
    {
        id: 3,
        name: "Suite",
        icon: () => <MdOutlineKingBed size={32} />,
        tag: "Premium",
        accent: true,
    },
];

const benefits = [
    {
        id: 1,
        icon: <MdOutlineHotel size={18} />,
        text: "Get 6 nights / 5 days free stay every year in your own 4-star hotel room or suite.",
        highlight: "6 nights / 5 days free",
    },
    {
        id: 2,
        icon: <PiCurrencyDollarSimpleBold size={18} />,
        text: "Receive your share of rental income from 6 nights / 5 days per week, professionally managed and hassle-free.",
        highlight: "rental income",
    },
    {
        id: 3,
        icon: <HiOutlineSparkles size={18} />,
        text: "Earn a share of income from gym, sauna, spa, and other wellness facilities.",
        highlight: "wellness facilities",
    },
    {
        id: 4,
        icon: <BsStarFill size={14} />,
        text: "Benefit from restaurant and bar income, even when you're not staying.",
        highlight: "restaurant and bar income",
    },
    {
        id: 5,
        icon: <LuBuilding2 size={18} />,
        text: "Earn from meeting rooms, conferences, and corporate events — a high-margin revenue stream.",
        highlight: "high-margin revenue stream",
    },
];

function useInView(threshold = 0.1) {
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

function HighlightText({ text, keyword }: { text: string; keyword: string }) {
    const idx = text.toLowerCase().indexOf(keyword.toLowerCase());
    if (idx === -1) return <>{text}</>;
    return (
        <>
            {text.slice(0, idx)}
            <span className="text-[#b89a5e] font-semibold">{text.slice(idx, idx + keyword.length)}</span>
            {text.slice(idx + keyword.length)}
        </>
    );
}

export default function HotelRooms() {
    const { ref, inView } = useInView(0.08);
    const [activeRoom, setActiveRoom] = useState(0);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
        .hr-display { font-family: 'Cormorant Garamond', serif; }
        .hr-ui      { font-family: 'Montserrat', sans-serif; }

        @keyframes hr-fadeUp {
          from { opacity:0; transform:translateY(36px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes hr-fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes hr-fadeLeft {
          from { opacity:0; transform:translateX(-24px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes hr-fadeRight {
          from { opacity:0; transform:translateX(24px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes hr-lineGrow {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes hr-cardIn {
          from { opacity:0; transform:translateY(28px) scale(0.96); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes hr-shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes hr-float {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-6px); }
        }

        .hr-fadeUp    { animation: hr-fadeUp   0.8s ease both; }
        .hr-fadeIn    { animation: hr-fadeIn   0.7s ease both; }
        .hr-fadeLeft  { animation: hr-fadeLeft  0.8s ease both; }
        .hr-fadeRight { animation: hr-fadeRight 0.8s ease both; }
        .hr-lineGrow  { animation: hr-lineGrow  0.9s cubic-bezier(0.77,0,0.18,1) both; transform-origin:left; }
        .hr-cardIn    { animation: hr-cardIn    0.75s cubic-bezier(0.34,1.2,0.64,1) both; }

        .hr-gold-text {
          background: linear-gradient(90deg,#b89a5e 0%,#e8d5a3 45%,#b89a5e 60%,#8a6e3a 100%);
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: hr-shimmer 4s linear infinite;
        }

        .hr-room-card:hover { transform:translateY(-4px); }
        .hr-room-card.active { border-color:rgba(184,154,94,0.6) !important; background:rgba(184,154,94,0.08) !important; }

        .hr-benefit-row {
          transition: all 0.25s ease;
        }
        .hr-benefit-row:hover {
          background: rgba(184,154,94,0.06);
          border-color: rgba(184,154,94,0.25) !important;
          transform: translateX(4px);
        }

        .hr-glass {
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.18);
        }

        .hr-glass-dark {
          background: rgba(10,8,6,0.55);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .hr-float { animation: hr-float 4s ease-in-out infinite; }
      `}</style>

            <section
                ref={ref}
                className="hr-ui relative w-full min-h-screen overflow-hidden"
            >
                {/* ── Background image with overlay ── */}
                <div className="absolute inset-0 z-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1920&q=90"
                        alt="Hotel background"
                        className="w-full h-full object-cover"
                    />
                    {/* Multi-layer overlay for luxury feel */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0d0b08]/85 via-[#1a1410]/75 to-[#0d0b08]/80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08]/60 via-transparent to-transparent" />
                    {/* Grain texture */}
                    <div
                        className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                            backgroundSize: "180px",
                        }}
                    />
                </div>

                {/* Top border glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[2px] z-10 bg-gradient-to-r from-transparent via-[#b89a5e]/50 to-transparent" />

                <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-36">

                    {/* ── Header ── */}
                    <div className="text-center mb-14 lg:mb-20">
                        <div
                            className={`inline-flex items-center gap-3 mb-5 ${inView ? "hr-fadeIn" : "opacity-0"}`}
                            style={{ animationDelay: "0.05s" }}
                        >
                            <span
                                className={`block h-px bg-[#b89a5e] origin-left ${inView ? "hr-lineGrow" : "opacity-0"}`}
                                style={{ width: 32, animationDelay: "0.1s" }}
                            />
                            <span className="text-[#b89a5e] text-[10px] font-semibold tracking-[0.28em] uppercase">
                                26th – 31st Floor
                            </span>
                            <span
                                className={`block h-px bg-[#b89a5e] origin-right ${inView ? "hr-lineGrow" : "opacity-0"}`}
                                style={{ width: 32, animationDelay: "0.1s", transformOrigin: "right" }}
                            />
                        </div>

                        <h2
                            className={`hr-display text-white font-bold leading-[1.05] mb-4 ${inView ? "hr-fadeUp" : "opacity-0"}`}
                            style={{ fontSize: "clamp(2.4rem,5vw,4.5rem)", animationDelay: "0.15s" }}
                        >
                            Hotel{" "}
                            <span className="hr-gold-text">Rooms</span>
                        </h2>

                        <p
                            className={`text-white font-light max-w-lg mx-auto leading-relaxed text-[13px] sm:text-sm ${inView ? "hr-fadeUp" : "opacity-0"}`}
                            style={{ animationDelay: "0.25s" }}
                        >
                            Own a share of a premium 5-star hotel and earn passive income year-round,
                            while enjoying exclusive stay privileges at Times Square.
                        </p>
                    </div>

                    {/* ── Main content grid ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

                        {/* LEFT — Room types card + floating badge */}
                        <div
                            className={`relative ${inView ? "hr-fadeLeft" : "opacity-0"}`}
                            style={{ animationDelay: "0.35s" }}
                        >
                            {/* Floating "Hotel Times Square" badge */}
                            <div className="hr-float absolute -top-5 right-4 sm:right-8 z-20">
                                <div className="hr-glass rounded-full px-4 py-2 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#b89a5e] animate-pulse" />
                                    <span className="text-white/80 text-[10px] font-semibold tracking-[0.2em] uppercase">
                                        Hotel Times Square
                                    </span>
                                </div>
                            </div>

                            {/* Room types glass card */}
                            <div className="hr-glass-dark rounded-3xl p-7 sm:p-9">
                                {/* Card header */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center gap-2 mb-3">
                                        <span className="h-px w-8 bg-[#b89a5e]/50" />
                                        <span className="text-[#b89a5e] text-[10px] font-semibold tracking-[0.22em] uppercase">
                                            Types of Rooms
                                        </span>
                                        <span className="h-px w-8 bg-[#b89a5e]/50" />
                                    </div>
                                    <p className="text-white text-[12px] font-light tracking-wide">
                                        Select your preferred room category
                                    </p>
                                </div>

                                {/* Room cards */}
                                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                    {roomTypes.map((room, i) => (
                                        <button
                                            key={room.id}
                                            onClick={() => setActiveRoom(i)}
                                            className={`hr-room-card group relative flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer
                        ${activeRoom === i
                                                    ? "active border-[#b89a5e]/60 bg-[#b89a5e]/8"
                                                    : "border-white/12 bg-white/5 hover:border-white/25 hover:bg-white/8"
                                                }`}
                                        >
                                            {/* Active indicator */}
                                            {activeRoom === i && (
                                                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#b89a5e]" />
                                            )}

                                            {/* Icon */}
                                            <span className={`transition-colors duration-300 ${activeRoom === i ? "text-[#b89a5e]" : "text-white group-hover:text-white/75"}`}>
                                                {room.icon()}
                                            </span>

                                            {/* Name */}
                                            <span className={`text-center text-[11px] sm:text-[12px] font-semibold leading-tight transition-colors duration-300 ${activeRoom === i ? "text-[#b89a5e]" : "text-white group-hover:text-white/85"}`}>
                                                {room.name}
                                            </span>

                                            {/* Tag */}
                                            <span className={`text-[9px] font-medium tracking-[0.1em] uppercase transition-colors duration-300 ${activeRoom === i ? "text-[#b89a5e]/70" : "text-white/25"}`}>
                                                {room.tag}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {/* Stars row */}
                                <div className="flex items-center justify-center gap-1.5 mt-7 pt-6 border-t border-white/8">
                                    {[...Array(5)].map((_, i) => (
                                        <BsStarFill key={i} size={10} className="text-[#b89a5e]" />
                                    ))}
                                    <span className="text-white text-[12px] font-medium ml-2 tracking-wide">
                                        Premium 5-Star Experience
                                    </span>
                                </div>
                            </div>

                            {/* Stats strip below card */}
                            <div className="grid grid-cols-3 gap-3 mt-4">
                                {[
                                    { value: "6", sub: "Floors", label: "26th–31st" },
                                    { value: "5★", sub: "Rating", label: "Hotel Grade" },
                                    { value: "3", sub: "Room Types", label: "Available" },
                                ].map((s) => (
                                    <div key={s.label} className="hr-glass-dark rounded-xl px-3 py-4 text-center">
                                        <p className="hr-display text-[#b89a5e] font-bold text-xl leading-none mb-0.5">
                                            {s.value}
                                        </p>
                                        <p className="text-white/55 text-[10px] font-medium">{s.sub}</p>
                                        <p className="text-white/25 text-[9px] tracking-wide mt-0.5">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT — Benefits list */}
                        <div
                            className={`${inView ? "hr-fadeRight" : "opacity-0"}`}
                            style={{ animationDelay: "0.45s" }}
                        >
                            {/* Section label */}
                            <div className="flex items-center gap-3 mb-7">
                                <span className="text-[#b89a5e] text-[10px] font-semibold tracking-[0.22em] uppercase">
                                    Investor Benefits
                                </span>
                                <span className="flex-1 h-px bg-white/10" />
                            </div>

                            {/* Benefit rows */}
                            <div className="space-y-3">
                                {benefits.map((b, i) => (
                                    <div
                                        key={b.id}
                                        className={`hr-benefit-row flex items-start gap-4 p-4 sm:p-5 rounded-xl border border-white/8 hr-glass-dark ${inView ? "hr-cardIn" : "opacity-0"}`}
                                        style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                                    >
                                        {/* Icon bubble */}
                                        <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#b89a5e]/12 border border-[#b89a5e]/20 flex items-center justify-center text-[#b89a5e]">
                                            {b.icon}
                                        </span>

                                        {/* Text */}
                                        <p className="text-white text-[12.5px] sm:text-sm font-light leading-relaxed pt-0.5">
                                            <HighlightText text={b.text} keyword={b.highlight} />
                                        </p>

                                        {/* Check */}
                                        <BsCheckCircle size={14} className="flex-shrink-0 text-[#b89a5e]/50 mt-1" />
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-8">
                                <a
                                    href="/investment"
                                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#b89a5e] hover:bg-[#d4b87a] text-[#1a1612] text-[11px] font-bold tracking-[0.16em] uppercase px-6 py-4 rounded-sm transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    View Investment Details →
                                </a>

                                <a
                                    href="/book"
                                    className="flex-1 inline-flex items-center justify-center gap-2 border border-white/20 hover:border-[#b89a5e]/60 text-white/70 hover:text-[#b89a5e] text-[11px] font-semibold tracking-[0.14em] uppercase px-6 py-4 rounded-sm transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    Book a Hotel Share
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}

                {/* Bottom border glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[1px] z-10 bg-gradient-to-r from-transparent via-[#b89a5e]/40 to-transparent" />
            </section>
        </>
    );
}