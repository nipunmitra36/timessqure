"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { BsArrowLeft, BsArrowRight, BsXLg, BsFullscreen } from "react-icons/bs";
import { HiOutlinePhotograph } from "react-icons/hi";
import { TbGridDots } from "react-icons/tb";
import { MdOutlineGridView } from "react-icons/md";

const categories = ["All", "Exterior", "Lobby", "Office", "Hotel", "Amenities"];

const images = [
    {
        id: 1,
        src: "/home/hero-1.jpg",
        thumb: "/home/hero-1.jpg",
        category: "Exterior",
        title: "Times Square Tower",
        desc: "32-storey iconic landmark, Tejgaon",
        span: "col-span-2 row-span-2",
    },
    {
        id: 2,
        src: "/home/hero-2.jpg",
        thumb: "/home/hero-2.jpg",
        category: "Lobby",
        title: "Grand Lobby",
        desc: "5-star standard common lobby",
        span: "col-span-1 row-span-1",
    },
    {
        id: 3,
        src: "/home/hero-3.jpg",
        thumb: "/home/hero-3.jpg",
        category: "Exterior",
        title: "Architectural Detail",
        desc: "Façade & structural excellence",
        span: "col-span-1 row-span-1",
    },
    {
        id: 4,
        src: "/home/hero-4.jpg",
        thumb: "/home/hero-4.jpg",
        category: "Office",
        title: "Grade-A Office Space",
        desc: "Premium commercial floors 5–25",
        span: "col-span-1 row-span-2",
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=85",
        thumb: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80",
        category: "Hotel",
        title: "Hotel Suite",
        desc: "5-star rooms, floors 26–31",
        span: "col-span-1 row-span-1",
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85",
        thumb: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
        category: "Amenities",
        title: "Rooftop Pool",
        desc: "32nd floor rooftop pool & sauna",
        span: "col-span-1 row-span-1",
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=85",
        thumb: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
        category: "Hotel",
        title: "Hotel Corridor",
        desc: "Luxury hotel interiors",
        span: "col-span-1 row-span-1",
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=85",
        thumb: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
        category: "Office",
        title: "Executive Floor",
        desc: "Corporate & financial offices",
        span: "col-span-1 row-span-1",
    },
    {
        id: 9,
        src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=85",
        thumb: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80",
        category: "Amenities",
        title: "Wellness & Spa",
        desc: "Gym, sauna, and spa facilities",
        span: "col-span-2 row-span-1",
    },
];

function useInView(threshold = 0.08) {
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

export default function Gallery() {
    const { ref, inView } = useInView();
    const [activeCategory, setActiveCategory] = useState("All");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [lightboxVisible, setLightboxVisible] = useState(false);
    const [gridMode, setGridMode] = useState<"masonry" | "uniform">("masonry");
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const filtered = images.filter(
        (img) => activeCategory === "All" || img.category === activeCategory
    );

    const openLightbox = useCallback((index: number) => {
        setLightboxIndex(index);
        setLightboxVisible(true);
        document.body.style.overflow = "hidden";
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxVisible(false);
        setTimeout(() => {
            setLightboxIndex(null);
            document.body.style.overflow = "";
        }, 300);
    }, []);

    const prevImage = useCallback(() => {
        setLightboxIndex((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length));
    }, [filtered.length]);

    const nextImage = useCallback(() => {
        setLightboxIndex((i) => (i === null ? 0 : (i + 1) % filtered.length));
    }, [filtered.length]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

    const currentImage = lightboxIndex !== null ? filtered[lightboxIndex] : null;

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
        .g-display { font-family: 'Cormorant Garamond', serif; }
        .g-ui      { font-family: 'Montserrat', sans-serif; }

        @keyframes g-fadeUp {
          from { opacity:0; transform:translateY(36px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes g-fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes g-lineGrow {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes g-imgReveal {
          from { opacity:0; transform:scale(1.06); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes g-shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes g-lbIn {
          from { opacity:0; transform:scale(0.93); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes g-lbOut {
          from { opacity:1; transform:scale(1); }
          to   { opacity:0; transform:scale(0.93); }
        }
        @keyframes g-slideUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .g-fadeUp   { animation: g-fadeUp  0.8s ease both; }
        .g-fadeIn   { animation: g-fadeIn  0.6s ease both; }
        .g-lineGrow { animation: g-lineGrow 0.9s cubic-bezier(0.77,0,0.18,1) both; transform-origin:left; }
        .g-imgReveal { animation: g-imgReveal 0.7s ease both; }
        .g-lbIn     { animation: g-lbIn  0.3s cubic-bezier(0.34,1.1,0.64,1) both; }
        .g-lbOut    { animation: g-lbOut 0.25s ease both; }
        .g-slideUp  { animation: g-slideUp 0.5s ease both; }

        .g-gold-text {
          background: linear-gradient(90deg,#EEA62A 0%,#e8d5a3 45%,#EEA62A 60%,#8a6e3a 100%);
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: g-shimmer 4s linear infinite;
        }

        .g-img-wrap img {
          transition: transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .g-img-wrap:hover img { transform: scale(1.07); }

        .g-overlay {
          background: linear-gradient(to top, rgba(10,8,6,0.88) 0%, rgba(10,8,6,0.3) 50%, transparent 100%);
          transition: opacity 0.35s ease;
          opacity: 0;
        }
        .g-img-wrap:hover .g-overlay { opacity: 1; }

        .g-category-pill {
          transition: all 0.22s ease;
        }
        .g-category-pill.active {
          background: #EEA62A;
          color: #1a1612;
          border-color: #EEA62A;
        }
        .g-category-pill:not(.active):hover {
          border-color: rgba(184,154,94,0.5);
          color: #EEA62A;
        }

        .g-dot-pattern {
          background-image: radial-gradient(circle, rgba(184,154,94,0.08) 1px, transparent 1px);
          background-size: 26px 26px;
        }

        .lb-overlay {
          transition: opacity 0.3s ease;
        }
        .lb-overlay.visible { opacity: 1; pointer-events: all; }
        .lb-overlay.hidden-lb { opacity: 0; pointer-events: none; }

        .g-counter-track {
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }
      `}</style>

            <section
                ref={ref}
                className="g-ui relative w-full bg-[#0f0d0a] overflow-hidden py-24 lg:py-36"
            >
                {/* Dot pattern */}
                <div className="absolute inset-0 g-dot-pattern opacity-50 pointer-events-none" />
                {/* Top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[2px] bg-gradient-to-r from-transparent via-[#EEA62A]/50 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

                    {/* ── Header ── */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
                        <div>
                            <div
                                className={`flex items-center gap-3 mb-4 ${inView ? "g-fadeIn" : "opacity-0"}`}
                                style={{ animationDelay: "0.05s" }}
                            >
                                <span
                                    className={`block h-px bg-[#EEA62A] origin-left ${inView ? "g-lineGrow" : "opacity-0"}`}
                                    style={{ width: 36, animationDelay: "0.1s" }}
                                />
                                <span className="text-[#EEA62A] text-[10px] font-semibold tracking-[0.28em] uppercase">
                                    Visual Tour
                                </span>
                            </div>
                            <h2
                                className={`g-display text-white font-bold leading-[1.05] ${inView ? "g-fadeUp" : "opacity-0"}`}
                                style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)", animationDelay: "0.15s" }}
                            >
                                Project{" "}
                                <span className="g-gold-text">Gallery</span>
                            </h2>
                        </div>

                        {/* Grid toggle */}
                        <div
                            className={`flex items-center gap-2 ${inView ? "g-fadeIn" : "opacity-0"}`}
                            style={{ animationDelay: "0.3s" }}
                        >
                            <span className="text-white/25 text-[11px] tracking-wider uppercase mr-1">View</span>
                            <button
                                onClick={() => setGridMode("masonry")}
                                className={`p-2.5 rounded-lg border transition-all duration-200 ${gridMode === "masonry" ? "bg-[#EEA62A]/15 border-[#EEA62A]/50 text-[#EEA62A]" : "border-white/10 text-white/30 hover:text-white/60"}`}
                            >
                                <TbGridDots size={16} />
                            </button>
                            <button
                                onClick={() => setGridMode("uniform")}
                                className={`p-2.5 rounded-lg border transition-all duration-200 ${gridMode === "uniform" ? "bg-[#EEA62A]/15 border-[#EEA62A]/50 text-[#EEA62A]" : "border-white/10 text-white/30 hover:text-white/60"}`}
                            >
                                <MdOutlineGridView size={16} />
                            </button>
                        </div>
                    </div>

                    {/* ── Category filter ── */}
                    <div
                        className={`flex flex-wrap items-center gap-2 mb-10 ${inView ? "g-fadeUp" : "opacity-0"}`}
                        style={{ animationDelay: "0.25s" }}
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`g-category-pill px-4 py-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase rounded-full border transition-all duration-200
                  ${activeCategory === cat
                                        ? "active"
                                        : "border-white/12 text-white bg-transparent"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}

                        <span className="ml-auto text-white/20 text-[11px] font-medium">
                            {filtered.length} photos
                        </span>
                    </div>

                    {/* ── Gallery grid ── */}
                    {gridMode === "masonry" ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[220px] gap-3 sm:gap-4">
                            {filtered.map((img, i) => (
                                <div
                                    key={img.id}
                                    onClick={() => openLightbox(i)}
                                    onMouseEnter={() => setHoveredId(img.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className={`g-img-wrap relative overflow-hidden rounded-xl cursor-pointer
                    ${img.span}
                    ${inView ? "g-imgReveal" : "opacity-0"}`}
                                    style={{ animationDelay: `${0.3 + i * 0.06}s` }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={img.thumb}
                                        alt={img.title}
                                        className="w-full h-full object-cover"
                                        loading={i < 4 ? "eager" : "lazy"}
                                    />

                                    {/* Hover overlay */}
                                    <div className="g-overlay absolute inset-0 z-10" />

                                    {/* Hover content */}
                                    <div className={`absolute inset-0 z-20 flex flex-col justify-end p-4 transition-all duration-350 ${hoveredId === img.id ? "opacity-100" : "opacity-0"}`}>
                                        <span className="inline-flex self-start items-center px-2 py-0.5 bg-[#EEA62A]/90 text-[#1a1612] text-[9px] font-bold tracking-[0.14em] uppercase rounded-full mb-2">
                                            {img.category}
                                        </span>
                                        <p className="text-white font-semibold text-sm leading-snug">{img.title}</p>
                                        <p className="text-white/55 text-[11px] font-light mt-0.5">{img.desc}</p>
                                    </div>

                                    {/* Fullscreen icon */}
                                    <div className={`absolute top-3 right-3 z-20 w-7 h-7 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${hoveredId === img.id ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
                                        <BsFullscreen size={11} className="text-white" />
                                    </div>

                                    {/* Corner accent */}
                                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#EEA62A]/0 group-hover:border-[#EEA62A]/60 transition-all duration-300 rounded-tl-xl z-20" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                            {filtered.map((img, i) => (
                                <div
                                    key={img.id}
                                    onClick={() => openLightbox(i)}
                                    onMouseEnter={() => setHoveredId(img.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className={`g-img-wrap relative overflow-hidden rounded-xl cursor-pointer aspect-square
                    ${inView ? "g-imgReveal" : "opacity-0"}`}
                                    style={{ animationDelay: `${0.3 + i * 0.06}s` }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={img.thumb}
                                        alt={img.title}
                                        className="w-full h-full object-cover"
                                        loading={i < 4 ? "eager" : "lazy"}
                                    />
                                    <div className="g-overlay absolute inset-0 z-10" />
                                    <div className={`absolute inset-0 z-20 flex flex-col justify-end p-3 transition-all duration-300 ${hoveredId === img.id ? "opacity-100" : "opacity-0"}`}>
                                        <span className="inline-flex self-start items-center px-2 py-0.5 bg-[#EEA62A]/90 text-[#1a1612] text-[9px] font-bold tracking-[0.12em] uppercase rounded-full mb-1.5">
                                            {img.category}
                                        </span>
                                        <p className="text-white font-semibold text-[12px] leading-snug">{img.title}</p>
                                    </div>
                                    <div className={`absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${hoveredId === img.id ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
                                        <BsFullscreen size={11} className="text-white" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── Bottom CTA ── */}
                    <div
                        className={`flex flex-col sm:flex-row items-center justify-between gap-4 mt-14 pt-10 border-t border-white/8 ${inView ? "g-fadeUp" : "opacity-0"}`}
                        style={{ animationDelay: "1s" }}
                    >
                        <div className="flex items-center gap-3">
                            <HiOutlinePhotograph size={18} className="text-[#EEA62A]" />
                            <span className="text-white/30 text-[12px] font-medium tracking-wide">
                                {images.length} curated visuals of Times Square, Tejgaon
                            </span>
                        </div>

                        {/* FIX: restored proper <a> tag — href was detached from the element */}
                        <a
                            href="/gallery"
                            className="inline-flex items-center gap-2 border border-[#EEA62A]/35 hover:border-[#EEA62A] text-[#EEA62A] text-[11px] font-semibold tracking-[0.16em] uppercase px-6 py-3 rounded-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#EEA62A]/8"
                        >
                            View Full Gallery →
                        </a>
                    </div>

                </div>

                {/* Bottom glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[1px] bg-gradient-to-r from-transparent via-[#EEA62A]/40 to-transparent" />
            </section>

            {/* ── Lightbox ── */}
            {lightboxIndex !== null && currentImage && (
                <div
                    className={`lb-overlay fixed inset-0 z-[999] flex items-center justify-center ${lightboxVisible ? "visible" : "hidden-lb"}`}
                    style={{ background: "rgba(5,4,3,0.96)", backdropFilter: "blur(12px)" }}
                >
                    {/* Close */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-xl border border-white/15 bg-white/5 hover:bg-white/12 hover:border-[#EEA62A]/50 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
                    >
                        <BsXLg size={14} />
                    </button>

                    {/* Counter */}
                    <div className="absolute top-5 left-5 z-10 flex items-center gap-3">
                        <span className="g-display text-[#EEA62A] font-bold text-xl leading-none">
                            0{lightboxIndex + 1}
                        </span>
                        <span className="text-white/20 text-sm">/</span>
                        <span className="text-white/30 text-sm">0{filtered.length}</span>
                    </div>

                    {/* Main image */}
                    <div
                        key={lightboxIndex}
                        className={`relative flex flex-col items-center w-full max-w-5xl mx-6 ${lightboxVisible ? "g-lbIn" : ""}`}
                    >
                        <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
                            style={{ maxHeight: "72vh" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={currentImage.src}
                                alt={currentImage.title}
                                className="w-full h-full object-contain"
                                style={{ maxHeight: "72vh" }}
                            />
                            {/* Category badge */}
                            <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 bg-[#EEA62A] text-[#1a1612] text-[10px] font-bold tracking-[0.16em] uppercase rounded-full">
                                {currentImage.category}
                            </span>
                        </div>

                        {/* Caption */}
                        <div className="g-slideUp w-full flex items-end justify-between mt-5 px-1">
                            <div>
                                <h3 className="g-display text-white font-semibold text-xl leading-snug">
                                    {currentImage.title}
                                </h3>
                                <p className="text-white/40 text-sm font-light mt-0.5">{currentImage.desc}</p>
                            </div>

                            {/* Dot indicators */}
                            <div className="flex items-center gap-1.5">
                                {filtered.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setLightboxIndex(i)}
                                        className={`rounded-full transition-all duration-200 ${i === lightboxIndex ? "w-4 h-1.5 bg-[#EEA62A]" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/45"}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Prev / Next */}
                    <button
                        onClick={prevImage}
                        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl border border-white/12 bg-white/5 hover:bg-[#EEA62A]/15 hover:border-[#EEA62A]/50 flex items-center justify-center text-white/50 hover:text-[#EEA62A] transition-all duration-200"
                    >
                        <BsArrowLeft size={16} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl border border-white/12 bg-white/5 hover:bg-[#EEA62A]/15 hover:border-[#EEA62A]/50 flex items-center justify-center text-white/50 hover:text-[#EEA62A] transition-all duration-200"
                    >
                        <BsArrowRight size={16} />
                    </button>

                    {/* Thumbnail strip */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 overflow-x-auto max-w-[90vw]">
                        {filtered.map((img, i) => (
                            <button
                                key={img.id}
                                onClick={() => setLightboxIndex(i)}
                                className={`flex-shrink-0 w-12 h-9 rounded-lg overflow-hidden border-2 transition-all duration-200 ${i === lightboxIndex ? "border-[#EEA62A] opacity-100 scale-110" : "border-transparent opacity-40 hover:opacity-70"}`}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={img.thumb} alt={img.title} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}