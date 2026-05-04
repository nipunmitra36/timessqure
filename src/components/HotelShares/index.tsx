"use client";

import { useEffect, useRef, useState } from "react";

const plans = [
    {
        id: 1,
        label: "Standard Room",
        badge: "Entry",
        icon: "◆",
        accent: "#7a8fa6",
        accentLight: "#7a8fa620",
        totalPrice: "5,50,000",
        downpayment: "1,00,000",
        emi: "9,375",
        emiMonths: 48,
        description: "An ideal entry point into premium hotel ownership — full access to returns and amenities.",
        highlight: false,
    },
    {
        id: 2,
        label: "Deluxe Room",
        badge: "Popular",
        icon: "▲",
        accent: "#EEA62A",
        accentLight: "#EEA62A20",
        totalPrice: "7,50,000",
        downpayment: "2,70,000",
        emi: "10,000",
        emiMonths: 48,
        description: "The most sought-after share tier — balanced investment with enhanced room category and returns.",
        highlight: true,
    },
    {
        id: 3,
        label: "Suite Room",
        badge: "Prestige",
        icon: "●",
        accent: "#8a6e3a",
        accentLight: "#8a6e3a20",
        totalPrice: "12,20,000",
        downpayment: "5,00,000",
        emi: "15,000",
        emiMonths: 48,
        description: "The pinnacle of hotel share ownership. Flagship suite category with maximum yield potential.",
        highlight: false,
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

function CountUp({ value, inView }: { value: string; inView: boolean }) {
    const [display, setDisplay] = useState("0");
    const digits = value.replace(/,/g, "");

    useEffect(() => {
        if (!inView) return;
        const target = parseInt(digits, 10);
        const duration = 1200;
        const steps = 40;
        const increment = target / steps;
        let current = 0;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            current = Math.min(Math.round(increment * step), target);
            // Format with commas (Indian style)
            const formatted = current.toLocaleString("en-IN");
            setDisplay(formatted);
            if (step >= steps) clearInterval(timer);
        }, duration / steps);
        return () => clearInterval(timer);
    }, [inView, digits]);

    return <>{inView ? display : "0"}</>;
}

export default function HotelShares() {
    const { ref, inView } = useInView(0.05);
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');

        .hs-display { font-family: 'Cormorant Garamond', serif; }
        .hs-ui      { font-family: 'Montserrat', sans-serif; }

        @keyframes hs-fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hs-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes hs-lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes hs-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes hs-imgReveal {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes hs-pulse-ring {
          0%   { transform: scale(0.95); opacity: 0.6; }
          70%  { transform: scale(1.08); opacity: 0; }
          100% { transform: scale(0.95); opacity: 0; }
        }

        .hs-fadeUp   { animation: hs-fadeUp   0.75s ease both; }
        .hs-fadeIn   { animation: hs-fadeIn   0.55s ease both; }
        .hs-lineGrow { animation: hs-lineGrow 0.85s cubic-bezier(0.77,0,0.18,1) both; transform-origin: left; }
        .hs-imgReveal{ animation: hs-imgReveal 0.9s ease both; }

        .hs-gold-text {
          background: linear-gradient(90deg, #EEA62A 0%, #e8d5a3 45%, #EEA62A 60%, #8a6e3a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: hs-shimmer 4s linear infinite;
        }

        .hs-card {
          transition: all 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .hs-card:hover {
          transform: translateY(-6px);
        }
        .hs-card.hs-highlight {
          transform: translateY(-8px);
        }
        .hs-card.hs-highlight:hover {
          transform: translateY(-12px);
        }

        .hs-row {
          transition: background 0.2s ease;
        }
        .hs-row:hover {
          background: rgba(184,154,94,0.04);
        }

        .hs-pulse-ring {
          animation: hs-pulse-ring 2.2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }

        .hs-img-wrap {
          overflow: hidden;
          border-radius: 20px;
        }
        .hs-img-wrap img {
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .hs-img-wrap:hover img {
          transform: scale(1.04);
        }

        .hs-cta-btn {
          transition: all 0.25s ease;
        }
        .hs-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(184,154,94,0.35);
        }
      `}</style>

            <section
                ref={ref}
                className="hs-ui relative w-full bg-white overflow-hidden py-24 lg:py-36"
            >
                {/* Subtle dot texture */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #EEA62A 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EEA62A]/30 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

                    {/* ── Header ── */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20">
                        <div>
                            <div
                                className={`flex items-center gap-3 mb-4 ${inView ? "hs-fadeIn" : "opacity-0"}`}
                                style={{ animationDelay: "0.05s" }}
                            >
                                <span
                                    className={`block h-px bg-[#EEA62A] origin-left ${inView ? "hs-lineGrow" : "opacity-0"}`}
                                    style={{ width: 36, animationDelay: "0.1s" }}
                                />
                                <span className="text-[#EEA62A] text-[16px] font-semibold tracking-[0.28em] uppercase">
                                    Investment
                                </span>
                            </div>
                            <h2
                                className={`hs-display text-[#1a1612] font-bold leading-[1.05] ${inView ? "hs-fadeUp" : "opacity-0"}`}
                                style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)", animationDelay: "0.15s" }}
                            >
                                Hotel{" "}
                                <span className="hs-gold-text">Shares</span>
                            </h2>
                            <p
                                className={`text-gray-900 text-[13px]  tracking-wide mt-3 max-w-md ${inView ? "hs-fadeUp" : "opacity-0"}`}
                                style={{ animationDelay: "0.25s" }}
                            >
                                Own a share in a 5-star hotel. Three tiers of ownership — each with a fixed down-payment and 48-month EMI plan.
                            </p>
                        </div>

                        {/* EMI callout */}
                        <div
                            className={`inline-flex flex-col items-center justify-center border border-[#EEA62A]/30 rounded-2xl px-8 py-5 bg-gradient-to-br from-[#fdf9f3] to-white ${inView ? "hs-fadeIn" : "opacity-0"}`}
                            style={{ animationDelay: "0.35s" }}
                        >
                            <span className="hs-display text-[#EEA62A] font-bold text-4xl leading-none">48</span>
                            <span className="text-gray-900 text-[12px] font-semibold tracking-[0.2em] uppercase mt-1">EMI Months</span>
                            <div className="w-8 h-px bg-[#EEA62A]/30 my-2" />
                            <span className="text-gray-900 text-[12px] font-medium tracking-wide">Easy Installments</span>
                        </div>
                    </div>

                    {/* ── Main Grid: Cards + Image ── */}
                    <div className="grid lg:grid-cols-[1fr_360px] gap-10 xl:gap-14 items-start">

                        {/* Left — Pricing Cards */}
                        <div>
                            <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
                                {plans.map((plan, i) => (
                                    <div
                                        key={plan.id}
                                        onMouseEnter={() => setHovered(plan.id)}
                                        onMouseLeave={() => setHovered(null)}
                                        className={`hs-card relative rounded-2xl border overflow-hidden bg-white
                      ${plan.highlight
                                                ? "border-[#EEA62A]/60 shadow-[0_16px_60px_rgba(184,154,94,0.18)] hs-highlight"
                                                : "border-[#e8e2da] hover:border-[#EEA62A]/30 hover:shadow-[0_8px_30px_rgba(184,154,94,0.1)]"
                                            }
                      ${inView ? "hs-fadeUp" : "opacity-0"}
                    `}
                                        style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                                    >
                                        {/* Top accent stripe */}
                                        <div
                                            className="h-1 w-full"
                                            style={{ background: `linear-gradient(90deg, ${plan.accent}88, ${plan.accent})` }}
                                        />

                                        {/* Popular badge */}
                                        {plan.highlight && (
                                            <div className="absolute top-5 right-4 flex items-center gap-1.5">
                                                <span className="relative flex h-2 w-2">
                                                    <span
                                                        className="hs-pulse-ring absolute inline-flex h-full w-full rounded-full"
                                                        style={{ background: plan.accent }}
                                                    />
                                                    <span
                                                        className="relative inline-flex rounded-full h-2 w-2"
                                                        style={{ background: plan.accent }}
                                                    />
                                                </span>
                                                <span
                                                    className="text-[9px] font-bold tracking-[0.18em] uppercase"
                                                    style={{ color: plan.accent }}
                                                >
                                                    {plan.badge}
                                                </span>
                                            </div>
                                        )}
                                        {!plan.highlight && (
                                            <div
                                                className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase"
                                                style={{ background: `${plan.accent}14`, color: plan.accent }}
                                            >
                                                {plan.badge}
                                            </div>
                                        )}

                                        <div className="p-5 sm:p-6">
                                            {/* Icon + label */}
                                            <div className="flex items-center gap-2.5 mb-5">
                                                <span
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-bold flex-shrink-0"
                                                    style={{ background: `${plan.accent}18`, color: plan.accent }}
                                                >
                                                    {plan.icon}
                                                </span>
                                                <h3 className="hs-display text-[#1a1612] font-semibold text-[1.1rem] leading-tight">
                                                    {plan.label}
                                                </h3>
                                            </div>

                                            {/* Total Price — big hero number */}
                                            <div className="mb-5 pb-5 border-b border-[#f0ebe4]">
                                                <span className="text-gray-900 text-[9.5px] font-semibold tracking-[0.18em] uppercase block mb-1.5">
                                                    Total Price / Share
                                                </span>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-gray-900 text-[12px] font-medium">BDT</span>
                                                    <span
                                                        className="hs-display font-bold leading-none"
                                                        style={{ fontSize: "1.7rem", color: plan.accent }}
                                                    >
                                                        <CountUp value={plan.totalPrice} inView={inView} />
                                                    </span>
                                                    <span className="text-gray-900 text-[12px]">/-</span>
                                                </div>
                                            </div>

                                            {/* Rows */}
                                            <div className="space-y-0 rounded-xl overflow-hidden border border-[#f0ebe4]">
                                                {/* Downpayment */}
                                                <div className="hs-row px-3.5 py-3 border-b border-[#f0ebe4]">
                                                    <span className="text-[#a09080] text-[12px] font-medium tracking-wide block mb-0.5">
                                                        Downpayment
                                                        <span className="text-[#c8bdb4]  ml-1">(One Time)</span>
                                                    </span>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-gray-900 text-[10.5px]">BDT</span>
                                                        <span className="hs-display text-[#1a1612] font-bold text-[1.2rem] leading-tight">
                                                            <CountUp value={plan.downpayment} inView={inView} />
                                                        </span>
                                                        <span className="text-gray-900 text-[12px]">/-</span>
                                                    </div>
                                                </div>

                                                {/* EMI */}
                                                <div className="hs-row px-3.5 py-3">
                                                    <span className="text-[#a09080] text-[12px] font-medium tracking-wide block mb-0.5">
                                                        Installment
                                                        <span className="text-[#c8bdb4]  ml-1">@ {plan.emiMonths} EMI</span>
                                                    </span>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-gray-900 text-[10.5px]">BDT</span>
                                                        <span
                                                            className="hs-display font-bold text-[1.2rem] leading-tight"
                                                            style={{ color: plan.accent }}
                                                        >
                                                            <CountUp value={plan.emi} inView={inView} />
                                                        </span>
                                                        <span className="text-gray-900 text-[12px]">/-</span>
                                                        <span className="text-[#c8bdb4] text-[9.5px] ml-0.5">/ mo</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-900 text-[10.5px]  leading-relaxed mt-4">
                                                {plan.description}
                                            </p>

                                            {/* CTA */}
                                            <button
                                                className="hs-cta-btn w-full mt-5 py-3 rounded-xl text-[12px] font-bold tracking-[0.16em] uppercase transition-all duration-300"
                                                style={
                                                    plan.highlight
                                                        ? {
                                                            background: `linear-gradient(135deg, ${plan.accent}, #8a6e3a)`,
                                                            color: "#fff",
                                                            boxShadow: `0 4px 20px ${plan.accent}40`,
                                                        }
                                                        : {
                                                            background: `${plan.accent}12`,
                                                            color: plan.accent,
                                                            border: `1px solid ${plan.accent}30`,
                                                        }
                                                }
                                            >
                                                Get Started →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footnote */}
                            <div
                                className={`flex flex-wrap items-center gap-3 mt-8 ${inView ? "hs-fadeIn" : "opacity-0"}`}
                                style={{ animationDelay: "0.8s" }}
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                    style={{ background: "#EEA62A" }}
                                />
                                <p className="text-[#a09080] text-[12px]  leading-relaxed">
                                    All prices in BDT. EMI plans subject to agreement. Downpayment is one-time and non-refundable.
                                    Hotel share ownership entitles the investor to proportional returns as per management contract.
                                </p>
                            </div>
                        </div>

                        {/* Right — Image + Highlights */}
                        <div
                            className={`flex flex-col gap-5 ${inView ? "hs-fadeUp" : "opacity-0"}`}
                            style={{ animationDelay: "0.55s" }}
                        >
                            {/* Hotel room image */}
                            <div className="hs-img-wrap relative shadow-[0_16px_60px_rgba(0,0,0,0.12)]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=85"
                                    alt="Hotel Suite Interior"
                                    className="w-full h-64 sm:h-72 lg:h-80 object-cover"
                                />
                                {/* Overlay label */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="backdrop-blur-sm bg-black/40 rounded-xl px-4 py-3 flex items-center justify-between">
                                        <div>
                                            <span className="text-white text-[9px] font-semibold tracking-[0.2em] uppercase block">
                                                Times Square
                                            </span>
                                            <span className="text-white text-[12px] font-semibold tracking-wide">
                                                5-Star Hotel · Kakrail
                                            </span>
                                        </div>
                                        <span className="text-[#EEA62A] text-[12px] font-bold tracking-wide">26–31F</span>
                                    </div>
                                </div>
                            </div>

                            {/* Why invest panel */}
                            <div className="rounded-2xl border border-[#e8e2da] p-5 bg-gradient-to-br from-[#fdf9f3] to-white">
                                <div className="flex items-center gap-2 mb-4">
                                    <span
                                        className="block h-px bg-[#EEA62A] origin-left"
                                        style={{ width: 20 }}
                                    />
                                    <span className="text-[#EEA62A] text-[9.5px] font-semibold tracking-[0.24em] uppercase">
                                        Why Invest
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        { label: "Guaranteed Returns", note: "Professional hotel management" },
                                        { label: "Flexible EMI Plan", note: "48-month easy installments" },
                                        { label: "Prime Location", note: "Kakrail commercial hub" },
                                        { label: "5-Star Standards", note: "International hospitality brand" },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 pb-3 border-b border-[#f0ebe4] last:border-0 last:pb-0"
                                        >
                                            <span
                                                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] font-bold"
                                                style={{ background: "#EEA62A18", color: "#EEA62A" }}
                                            >
                                                {i + 1}
                                            </span>
                                            <div>
                                                <p className="text-[#1a1612] text-[12px] font-semibold leading-tight">{item.label}</p>
                                                <p className="text-gray-900 text-[12px]  mt-0.5">{item.note}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Main CTA */}
                            <a
                                href="#contact"
                                className="hs-cta-btn w-full flex items-center justify-center gap-2 py-4 rounded-xl text-[12px] font-bold tracking-[0.18em] uppercase"
                                style={{
                                    background: "linear-gradient(135deg, #EEA62A, #8a6e3a)",
                                    color: "#fff",
                                    boxShadow: "0 6px 28px rgba(184,154,94,0.35)",
                                }}
                            >
                                Book a Consultation
                                <span className="text-base">→</span>
                            </a>
                        </div>
                    </div>

                    {/* ── Bottom strip ── */}
                    <div
                        className={`mt-16 pt-10 border-t border-[#f0ebe4] flex flex-wrap items-center justify-between gap-4 ${inView ? "hs-fadeIn" : "opacity-0"}`}
                        style={{ animationDelay: "1s" }}
                    >
                        <div className="flex flex-wrap gap-8">
                            {plans.map((p) => (
                                <div key={p.id} className="flex items-center gap-2">
                                    <span
                                        className="w-2 h-2 rounded-full flex-shrink-0"
                                        style={{ background: p.accent }}
                                    />
                                    <span className="text-gray-900 text-[12px] font-medium">{p.label}</span>
                                    <span className="text-[#c8bdb4] text-[12px]">·</span>
                                    <span className="text-[#b3a89e] text-[12px] ">BDT {p.totalPrice}/-</span>
                                </div>
                            ))}
                        </div>
                        <span className="text-[#c8bdb4] text-[12px] tracking-wide">
                            Times Square · Kakrail, Dhaka
                        </span>
                    </div>

                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EEA62A]/25 to-transparent" />
            </section>
        </>
    );
}