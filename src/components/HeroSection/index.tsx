"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

const slides = [
    {
        id: 1,
        image: "/home/hero-1.jpg",
        tag: "Premium Commercial Space",
        heading: "TIMES SQUARE DHAKA",
        sub: "Where Vision Rises, Business Thrives.",
    },
    {
        id: 2,
        image: "/home/hero-2.jpg",
        tag: "5-Star Hotel Investment",
        heading: "Invest in the Future of Hospitality",
        sub: "Secured hotel share ownership with guaranteed ROI, managed by international hospitality brands in a landmark tower.",
    },
    // {
    //     id: 3,
    //     image: "/home/hero-3.jpg",
    //     tag: "Iconic Architecture",
    //     heading: "A Skyline Defining\nMasterpiece",
    //     sub: "Positioned in the heart of the city, Times Square rises above the ordinary — a destination for living, working, and thriving.",
    // },

];

const DURATION = 5500;

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState<number | null>(null);
    const [animating, setAnimating] = useState(false);
    const [progress, setProgress] = useState(0);
    const rafRef = useRef<number | null>(null);

    const goTo = useCallback(
        (index: number) => {
            if (animating || index === current) return;
            setPrev(current);
            setCurrent(index);
            setAnimating(true);
            setProgress(0);
            setTimeout(() => {
                setPrev(null);
                setAnimating(false);
            }, 1100);
        },
        [animating, current]
    );

    const next = useCallback(() => {
        goTo((current + 1) % slides.length);
    }, [current, goTo]);

    useEffect(() => {
        setProgress(0);
        const start = performance.now();
        const tick = (now: number) => {
            const pct = Math.min(((now - start) / DURATION) * 100, 100);
            setProgress(pct);
            if (pct < 100) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                next();
            }
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [current, next]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-ui { font-family: 'Montserrat', sans-serif; }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .anim-enter { animation: fadeIn  1.1s cubic-bezier(0.4,0,0.2,1) forwards; }
        .anim-leave { animation: fadeOut 1.1s cubic-bezier(0.4,0,0.2,1) forwards; }
        .anim-tag   { animation: fadeUp 0.8s 0.20s both; }
        .anim-h1    { animation: fadeUp 0.9s 0.35s both; }
        .anim-sub   { animation: fadeUp 0.9s 0.50s both; }
        .anim-btns  { animation: fadeUp 0.9s 0.65s both; }
      `}</style>

            <section className="font-ui relative w-full h-svh min-h-[600px] overflow-hidden bg-[#0d0b09]">

                {/* Slide image layers */}
                {slides.map((slide, i) => {
                    const isActive = i === current;
                    const isLeaving = i === prev;
                    const animClass = isActive && animating
                        ? "anim-enter"
                        : isLeaving && animating
                            ? "anim-leave"
                            : "";

                    return (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 ${animClass}`}
                            style={{ zIndex: isActive ? 2 : isLeaving ? 1 : 0 }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={slide.image}
                                alt={slide.tag}
                                className="w-full h-full object-cover"
                                loading={i === 0 ? "eager" : "lazy"}
                            />
                        </div>
                    );
                })}

                {/* Gradient overlay */}
                <div
                    className="absolute inset-0 z-[3] pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to right, rgba(10,8,6,0.82) 0%, rgba(10,8,6,0.3) 60%, transparent 100%), linear-gradient(to top, rgba(10,8,6,0.65) 0%, transparent 55%)",
                    }}
                />

                {/* Grain texture */}
                <div
                    className="absolute inset-0 z-[4] pointer-events-none opacity-[0.035]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundSize: "200px",
                    }}
                />

                {/* Hero content — key forces re-mount for fresh animations */}
                <div
                    key={current}
                    className="absolute inset-0 z-[5] flex flex-col justify-center px-8 sm:px-16 lg:px-28 max-w-4xl"
                >
                    {/* Tag */}
                    <p className="anim-tag flex items-center gap-3 text-[#EEA62A] text-[16px] font-semibold tracking-[0.22em] uppercase mb-5">
                        <span className="block w-8 h-px bg-[#EEA62A]" />
                        {slides[current].tag}
                    </p>

                    {/* Heading */}
                    <h1
                        className="anim-h1 font-display text-white font-semibold leading-[1.08] mb-6 whitespace-pre-line"
                        style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
                    >
                        {slides[current].heading}
                    </h1>

                    {/* Subtext */}
                    <p className="anim-sub text-white  leading-[1.78] max-w-[480px] mb-10"
                        style={{ fontSize: "clamp(13px, 1.3vw, 15px)" }}
                    >
                        {slides[current].sub}
                    </p>

                    {/* Buttons */}
                    <div className="anim-btns flex flex-wrap items-center gap-4">
                        <Link
                            href="/book"
                            className="inline-flex items-center gap-2 bg-[#EEA62A] hover:bg-[#d4b87a] text-[#1a1612] px-8 py-3.5 text-[12px] font-bold tracking-[0.16em] uppercase rounded-sm transition-all duration-200 hover:-translate-y-0.5"
                        >
                            Book Now <span>→</span>
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 text-white hover:text-[#EEA62A] border border-white/30 hover:border-[#EEA62A] px-7 py-3.5 text-[12px] font-medium tracking-[0.14em] uppercase rounded-sm transition-all duration-200 hover:-translate-y-0.5"
                        >
                            See Details <span>↗</span>
                        </Link>
                    </div>
                </div>

                {/* Arrow buttons */}
                <button
                    onClick={() => goTo((current - 1 + slides.length) % slides.length)}
                    aria-label="Previous slide"
                    className="hidden md:flex absolute right-20 top-1/2 -translate-y-1/2 z-[6] w-12 h-12 items-center justify-center border border-white/20 hover:border-[#EEA62A] bg-white/5 hover:bg-[#EEA62A]/15 text-white backdrop-blur-sm rounded-sm transition-all duration-200"
                >
                    ←
                </button>
                <button
                    onClick={() => goTo((current + 1) % slides.length)}
                    aria-label="Next slide"
                    className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-[6] w-12 h-12 items-center justify-center border border-white/20 hover:border-[#EEA62A] bg-white/5 hover:bg-[#EEA62A]/15 text-white backdrop-blur-sm rounded-sm transition-all duration-200"
                >
                    →
                </button>

                {/* Bottom progress bar + counter */}
                <div className="absolute bottom-10 left-8 sm:left-16 lg:left-28 z-[6] flex items-center gap-5">
                    <span className="text-[12px] font-semibold tracking-[0.1em] text-white/40">
                        <span className="text-white">0{current + 1}</span> / 0{slides.length}
                    </span>
                    <div className="flex items-center gap-2.5">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className="relative w-9 h-0.5 bg-white/20 hover:bg-white/35 rounded-sm overflow-hidden transition-colors duration-200"
                            >
                                <span
                                    className="absolute inset-0 bg-[#EEA62A] rounded-sm origin-left"
                                    style={{
                                        transform: `scaleX(${i === current ? progress / 100 : i < current ? 1 : 0})`,
                                        transition: i === current ? "none" : "transform 0.3s ease",
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}