"use client";

import { useEffect, useRef, useState } from "react";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { TbRulerMeasure, TbBuildingSkyscraper } from "react-icons/tb";
import { MdOutlineSquareFoot } from "react-icons/md";
import { BsLayers } from "react-icons/bs";
// import { HiOutlineOfficeBuilding } from "@react-icons/all-files/hi/HiOutlineOfficeBuilding";

const floorTypes = [
    {
        id: 1,
        type: "Ground & 1st Floor",
        badge: "Lobby Level",
        area: "6,930",
        unit: "sft",
        levels: null,
        breakdown: null,
        accent: false,
        icon: <HiOutlineOfficeBuilding size={20} />,
    },
    {
        id: 2,
        type: "Second Floor",
        badge: "Commercial",
        area: "8,600",
        unit: "sft",
        levels: null,
        breakdown: null,
        accent: false,
        icon: <HiOutlineOfficeBuilding size={20} />,
    },
    {
        id: 3,
        type: "Type C",
        badge: "Office Space",
        area: "8,864",
        unit: "sft",
        levels: "Level 7, 13, 19",
        breakdown: [
            { label: "Unit A", value: "5,120 sft" },
            { label: "Unit B", value: "3,744 sft" },
        ],
        accent: true,
        icon: <HiOutlineOfficeBuilding size={20} />,
    },
    {
        id: 4,
        type: "Type D",
        badge: "Office Space",
        area: "8,540",
        unit: "sft",
        levels: "Level 8–10, 14–16, 19–24",
        breakdown: [
            { label: "Unit A", value: "4,800 sft" },
            { label: "Unit B", value: "3,744 sft" },
        ],
        accent: true,
        icon: <HiOutlineOfficeBuilding size={20} />,
    },
];

const galleryImages = [
    {
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=85",
        alt: "Floor plan",
        aspect: "aspect-[16/7]",
    },
    {
        src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85",
        alt: "Commercial lobby",
        aspect: "aspect-[16/10]",
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

export default function CommercialFloor() {
    const { ref, inView } = useInView(0.08);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
        .cf-display { font-family: 'Cormorant Garamond', serif; }
        .cf-ui      { font-family: 'Montserrat', sans-serif; }

        @keyframes cf-fadeUp {
          from { opacity:0; transform:translateY(36px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes cf-fadeLeft {
          from { opacity:0; transform:translateX(-28px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes cf-fadeRight {
          from { opacity:0; transform:translateX(28px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes cf-lineGrow {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes cf-cardIn {
          from { opacity:0; transform:translateY(32px) scale(0.96); }
          to   { opacity:1; transform:translateY(0)   scale(1); }
        }
        @keyframes cf-imgReveal {
          from { clip-path:inset(0 100% 0 0); }
          to   { clip-path:inset(0 0% 0 0); }
        }
        @keyframes cf-shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes cf-pulse-ring {
          0%   { transform:scale(1);   opacity:0.6; }
          100% { transform:scale(1.8); opacity:0; }
        }

        .cf-fadeUp    { animation: cf-fadeUp   0.8s ease both; }
        .cf-fadeLeft  { animation: cf-fadeLeft  0.8s ease both; }
        .cf-fadeRight { animation: cf-fadeRight 0.8s ease both; }
        .cf-lineGrow  { animation: cf-lineGrow  0.9s cubic-bezier(0.77,0,0.18,1) both; transform-origin:left; }
        .cf-cardIn    { animation: cf-cardIn    0.75s cubic-bezier(0.34,1.2,0.64,1) both; }
        .cf-imgReveal { animation: cf-imgReveal 1.1s cubic-bezier(0.77,0,0.18,1) both; }

        .cf-gold-text {
          background: linear-gradient(90deg,#EEA62A 0%,#e8d5a3 45%,#EEA62A 60%,#8a6e3a 100%);
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: cf-shimmer 4s linear infinite;
        }

        .cf-card-hover:hover {
          box-shadow:0 4px 32px rgba(184,154,94,0.13), 0 0 0 1.5px rgba(184,154,94,0.35);
          transform:translateY(-3px);
        }
        .cf-img-zoom img { transition:transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); }
        .cf-img-zoom:hover img { transform:scale(1.04); }

        .cf-dot-pattern {
          background-image:radial-gradient(circle,rgba(184,154,94,0.07) 1px,transparent 1px);
          background-size:24px 24px;
        }
      `}</style>

            <section
                ref={ref}
                className="cf-ui relative w-full bg-white overflow-hidden py-24 lg:py-36"
            >
                {/* Subtle dot pattern */}
                <div className="absolute inset-0 cf-dot-pattern pointer-events-none opacity-60" />

                {/* Top decorative border */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#EEA62A]/40 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

                    {/* ── Section Header ── */}
                    <div className="mb-14 lg:mb-20">
                        <div
                            className={`flex items-center gap-3 mb-4 ${inView ? "cf-fadeLeft" : "opacity-0"}`}
                            style={{ animationDelay: "0.05s" }}
                        >
                            <span
                                className={`block h-px bg-[#EEA62A] origin-left ${inView ? "cf-lineGrow" : "opacity-0"}`}
                                style={{ width: 36, animationDelay: "0.1s" }}
                            />
                            <span className="text-[#EEA62A] text-[10px] font-semibold tracking-[0.28em] uppercase">
                                Floor Plans
                            </span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                            <h2
                                className={`cf-display text-[#1a1612] font-bold leading-[1.05] ${inView ? "cf-fadeUp" : "opacity-0"}`}
                                style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)", animationDelay: "0.15s" }}
                            >
                                Commercial{" "}
                                <span className="cf-gold-text">Floor Spaces</span>
                            </h2>
                            <p
                                className={`text-[#1a1612] font-light leading-relaxed max-w-sm text-[13px] lg:text-right ${inView ? "cf-fadeRight" : "opacity-0"}`}
                                style={{ animationDelay: "0.25s" }}
                            >
                                Flexible Grade-A commercial units designed for banks, corporate offices,
                                and business centers across multiple levels.
                            </p>
                        </div>

                        {/* Divider */}
                        <div
                            className={`mt-8 h-px bg-gradient-to-r from-[#EEA62A]/40 via-[#EEA62A]/10 to-transparent ${inView ? "cf-lineGrow" : "opacity-0"}`}
                            style={{ animationDelay: "0.3s" }}
                        />
                    </div>

                    {/* ── Main Grid ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

                        {/* LEFT — Floor cards */}
                        <div className="space-y-4">

                            {/* Top label */}
                            <div
                                className={`flex items-center gap-2 mb-6 ${inView ? "cf-fadeLeft" : "opacity-0"}`}
                                style={{ animationDelay: "0.35s" }}
                            >
                                <HiOutlineOfficeBuilding size={14} className="text-[#EEA62A]" />
                                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#1a1612] uppercase">
                                    Available Units
                                </span>
                                <span className="flex-1 h-px bg-[#1a1612]/8" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {floorTypes.map((f, i) => (
                                    <div
                                        key={f.id}
                                        className={`cf-card-hover group relative bg-white border rounded-2xl p-6 flex flex-col gap-4 cursor-default transition-all duration-300
                      ${f.accent
                                                ? "border-[#EEA62A]/30 bg-gradient-to-br from-white to-[#faf8f4]"
                                                : "border-[#1a1612]/8"
                                            }
                      ${inView ? "cf-cardIn" : "opacity-0"}`}
                                        style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                                    >
                                        {/* Top row */}
                                        <div className="flex items-start justify-between">
                                            <span
                                                className={`p-2 rounded-lg transition-colors duration-300
                          ${f.accent
                                                        ? "bg-[#EEA62A]/12 text-[#EEA62A] group-hover:bg-[#EEA62A]/20"
                                                        : "bg-[#1a1612]/5 text-[#1a1612]/40 group-hover:bg-[#EEA62A]/10 group-hover:text-[#EEA62A]"
                                                    }`}
                                            >
                                                {f.icon}
                                            </span>
                                            <span
                                                className={`text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full
                          ${f.accent
                                                        ? "bg-[#EEA62A]/12 text-[#EEA62A]"
                                                        : "bg-[#1a1612]/6 text-[#1a1612]/40"
                                                    }`}
                                            >
                                                {f.badge}
                                            </span>
                                        </div>

                                        {/* Type name */}
                                        <div>
                                            <p className="text-[#1a1612] text-[11px] font-medium tracking-[0.12em] uppercase mb-1">
                                                {f.type}
                                            </p>
                                            <div className="flex items-baseline gap-1.5">
                                                <span
                                                    className={`cf-display font-bold leading-none ${f.accent ? "text-[#EEA62A]" : "text-[#1a1612]"}`}
                                                    style={{ fontSize: "clamp(1.6rem,2.5vw,2.2rem)" }}
                                                >
                                                    {f.area}
                                                </span>
                                                <span className="text-[#1a1612] text-sm font-medium">{f.unit}</span>
                                            </div>
                                        </div>

                                        {/* Level info */}
                                        {f.levels && (
                                            <div className="flex items-center gap-2">
                                                <HiOutlineOfficeBuilding size={12} className="text-[#EEA62A] flex-shrink-0" />
                                                <span className="text-[11px] text-[#1a1612] font-medium">{f.levels}</span>
                                            </div>
                                        )}

                                        {/* Breakdown */}
                                        {f.breakdown && (
                                            <div className="border-t border-[#1a1612]/6 pt-3 grid grid-cols-2 gap-2">
                                                {f.breakdown.map((b) => (
                                                    <div key={b.label} className="bg-[#1a1612]/3 rounded-lg px-3 py-2">
                                                        <p className="text-[10px] text-[#1a1612] font-medium mb-0.5">{b.label}</p>
                                                        <p className="text-[#1a1612] text-[12px] font-semibold">{b.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Bottom hover accent */}
                                        <span className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#EEA62A]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                                    </div>
                                ))}
                            </div>

                            {/* CTA strip */}
                            <div
                                className={`mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 ${inView ? "cf-fadeUp" : "opacity-0"}`}
                                style={{ animationDelay: "0.85s" }}
                            >
                                <a
                                    href="/floor-plans"
                                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1a1612] hover:bg-[#2a2018] text-white text-[11px] font-semibold tracking-[0.16em] uppercase px-6 py-3.5 rounded-sm transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    Download Floor Plan →
                                </a>

                                <a
                                    href="/contact"
                                    className="flex-1 inline-flex items-center justify-center gap-2 border border-[#EEA62A]/50 hover:border-[#EEA62A] text-[#EEA62A] text-[11px] font-semibold tracking-[0.16em] uppercase px-6 py-3.5 rounded-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#EEA62A]/5"
                                >
                                    Book a Unit
                                </a>
                            </div>
                        </div>

                        {/* RIGHT — Images */}
                        <div className="flex flex-col gap-4">
                            {/* Floor plan image */}
                            <div
                                className={`cf-img-zoom relative overflow-hidden rounded-2xl border border-[#1a1612]/8 ${inView ? "cf-imgReveal" : "opacity-0"}`}
                                style={{ animationDelay: "0.5s" }}
                            >
                                <div className="aspect-[16/7] overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=85"
                                        alt="Commercial floor plan"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Label overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a1612]/70 to-transparent px-5 py-4">
                                    <p className="text-white text-[11px] font-semibold tracking-[0.16em] uppercase flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#EEA62A]" />
                                        Typical Floor Plan
                                    </p>
                                </div>
                            </div>

                            {/* Lobby image */}
                            <div
                                className={`cf-img-zoom relative overflow-hidden rounded-2xl border border-[#1a1612]/8 ${inView ? "cf-imgReveal" : "opacity-0"}`}
                                style={{ animationDelay: "0.65s" }}
                            >
                                <div className="aspect-[16/10] overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85"
                                        alt="Commercial lobby interior"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Times Square badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#1a1612] text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full shadow-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#EEA62A]" />
                                        Times Square Lobby
                                    </span>
                                </div>
                                {/* Bottom overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a1612]/65 to-transparent px-5 py-4">
                                    <p className="text-white/80 text-[11px] font-medium tracking-wide">
                                        5-Star Standard Common Lobby · Ground Floor
                                    </p>
                                </div>
                            </div>

                            {/* Stats strip */}
                            <div
                                className={`grid grid-cols-3 gap-px bg-[#1a1612]/8 rounded-xl overflow-hidden ${inView ? "cf-fadeUp" : "opacity-0"}`}
                                style={{ animationDelay: "0.8s" }}
                            >
                                {[
                                    { label: "Total Floors", value: "32" },
                                    { label: "Commercial", value: "1–25" },
                                    { label: "Max Unit", value: "8,864 sft" },
                                ].map((s) => (
                                    <div key={s.label} className="bg-[#faf9f7] px-4 py-4 text-center">
                                        <p className="cf-display text-[#EEA62A] font-bold text-xl leading-none mb-1">{s.value}</p>
                                        <p className="text-[10px] text-[#1a1612] font-medium tracking-[0.1em] uppercase">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div >

                {/* Bottom border */}
                < div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#EEA62A]/30 to-transparent" />
            </section >
        </>
    );
}