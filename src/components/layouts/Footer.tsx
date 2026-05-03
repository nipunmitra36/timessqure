"use client";

import Link from "next/link";
import { useState } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const navColumns = [
    {
        heading: "Explore",
        links: [
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Location", href: "/location" },
            { label: "Gallery", href: "/gallery" },
        ],
    },
    {
        heading: "Property",
        links: [
            { label: "Floor Plans", href: "/floor-plans" },
            { label: "Investment", href: "/investment" },
            { label: "Amenities", href: "/amenities" },
            { label: "Book Now", href: "/book" },
        ],
    },
    {
        heading: "Contact",
        links: [
            { label: "Contact Us", href: "/contact" },
            { label: "info@headroombd.com", href: "mailto:info@headroombd.com" },
            { label: "+880 1515 664 405", href: "tel:+8801515664405" },
            { label: "+880 1537 653 763", href: "tel:+8801537653763" },
        ],
    },
];

const partners = [
    { name: "Headroom", role: "Design & Consultancy" },
    { name: "China State Construction", role: "Construction Partner" },
    { name: "Asiatic Laboratories", role: "Joint-Venture Partner" },
];

const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
];

// ── Social icons ──────────────────────────────────────────────────────────────

const socials = [
    {
        label: "Facebook",
        href: "#",
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "#",
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "#",
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        label: "YouTube",
        href: "#",
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a1612" />
            </svg>
        ),
    },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);

    const handleSubscribe = () => {
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
        setSubscribed(true);
        setEmail("");
    };

    const currentYear = new Date().getFullYear();

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

        .ft-display { font-family: 'Cormorant Garamond', serif; }
        .ft-ui      { font-family: 'Montserrat', sans-serif; }

        @keyframes ft-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes ft-fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ft-dotPulse {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.6; }
        }
        @keyframes ft-lineDraw {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .ft-gold-shimmer {
          background: linear-gradient(90deg, #b89a5e 0%, #e8d5a3 45%, #b89a5e 60%, #8a6e3a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: ft-shimmer 4s linear infinite;
        }

        .ft-nav-link {
          position: relative;
          display: inline-block;
          transition: color 0.2s ease;
        }

        .ft-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 100%; height: 1px;
          background: #b89a5e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }

        .ft-nav-link:hover::after { transform: scaleX(1); }
        .ft-nav-link:hover { color: #b89a5e; }

        .ft-social-btn {
          transition: all 0.25s ease;
        }
        .ft-social-btn:hover {
          background: rgba(184,154,94,0.15);
          border-color: rgba(184,154,94,0.5);
          color: #b89a5e;
          transform: translateY(-2px);
        }

        .ft-dot-grid {
          background-image: radial-gradient(circle, rgba(184,154,94,0.15) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .ft-partner-chip:hover {
          border-color: rgba(184,154,94,0.4);
          background: rgba(184,154,94,0.06);
        }

        .ft-newsletter-input {
          transition: all 0.25s ease;
        }

        .ft-newsletter-input:focus {
          outline: none;
          border-color: rgba(184,154,94,0.5);
          background: rgba(255,255,255,0.05);
          box-shadow: 0 0 0 3px rgba(184,154,94,0.08);
        }

        .ft-newsletter-btn {
          transition: all 0.25s ease;
        }
        .ft-newsletter-btn:hover {
          background: #d4b87a;
          transform: translateX(2px);
        }

        .ft-legal-link {
          transition: color 0.2s ease;
        }
        .ft-legal-link:hover { color: #b89a5e; }
      `}</style>

            <footer className="ft-ui relative w-full bg-[#100e0b] overflow-hidden">

                {/* ── Top gradient line ── */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b89a5e]/50 to-transparent" />

                {/* ── Dot grid texture (top-right) ── */}
                <div className="ft-dot-grid absolute top-0 right-0 w-80 h-80 opacity-100 pointer-events-none" />

                {/* ── Large brand watermark ── */}
                <div
                    className="ft-display absolute bottom-16 left-1/2 -translate-x-1/2 text-white/[0.015] font-bold select-none pointer-events-none whitespace-nowrap"
                    style={{ fontSize: "clamp(4rem, 12vw, 10rem)", lineHeight: 1 }}
                    aria-hidden="true"
                >
                    TIMES SQUARE
                </div>

                {/* ── Main content ── */}
                <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-0">

                    {/* ═══ TOP SECTION ═══ */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 pb-14 border-b border-white/[0.06]">

                        {/* Brand column */}
                        <div>
                            {/* Logo mark */}
                            <Link href="/" className="inline-flex items-center gap-3 mb-7 group">
                                <div className="w-10 h-10 border border-[#b89a5e]/50 rounded-sm flex items-center justify-center transition-all duration-300 group-hover:border-[#b89a5e]">
                                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 1L14 5v6l-6 4L2 11V5L8 1z" stroke="#b89a5e" strokeWidth="1.2" />
                                        <path d="M8 5v6M5 6.5l3-2 3 2" stroke="#b89a5e" strokeWidth="1" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <div className="flex flex-col gap-[3px]">
                                    <span
                                        className="ft-display text-white font-bold leading-none"
                                        style={{ fontSize: "1.55rem" }}
                                    >
                                        Times Square
                                    </span>
                                    <span className="text-[#b89a5e] text-[9px] uppercase tracking-[0.2em] font-light">
                                        Premium Properties
                                    </span>
                                </div>
                            </Link>

                            {/* Tagline */}
                            <p className="text-white/45 text-[12.5px] font-light leading-[1.85] max-w-sm mb-8 tracking-wide">
                                Dhaka's landmark destination for commercial excellence and
                                hospitality — rising at the heart of Tejgaon, built for a
                                new generation of ambition.
                            </p>

                            {/* Partners */}
                            <div className="mb-8">
                                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#b89a5e] mb-3">
                                    Strategic Partners
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {partners.map((p) => (
                                        <div
                                            key={p.name}
                                            className="ft-partner-chip inline-flex flex-col border border-white/[0.08] rounded-lg px-3 py-2 transition-all duration-200 cursor-default"
                                        >
                                            <span className="text-white/70 text-[10.5px] font-medium leading-tight">
                                                {p.name}
                                            </span>
                                            <span className="text-[#b89a5e]/60 text-[8.5px] tracking-wide mt-[2px]">
                                                {p.role}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Social icons */}
                            <div className="flex items-center gap-2">
                                {socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        aria-label={s.label}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="ft-social-btn w-9 h-9 rounded-lg border border-white/[0.1] flex items-center justify-center text-white/40"
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Right column: nav + newsletter */}
                        <div className="flex flex-col gap-10">

                            {/* Nav grid */}
                            <div className="grid grid-cols-3 gap-6">
                                {navColumns.map((col) => (
                                    <div key={col.heading}>
                                        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#b89a5e] mb-4">
                                            {col.heading}
                                        </p>
                                        <ul className="flex flex-col gap-3">
                                            {col.links.map((link) => (
                                                <li key={link.href}>
                                                    <Link
                                                        href={link.href}
                                                        className="ft-nav-link text-white/45 text-[11px] font-light tracking-wide"
                                                        style={{ textDecoration: "none" }}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-white/[0.06]" />

                            {/* Newsletter */}
                            <div>
                                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#b89a5e] mb-2">
                                    Stay Updated
                                </p>
                                <p className="text-white/35 text-[11px] font-light mb-4 leading-relaxed">
                                    Receive project updates, investment insights, and launch news.
                                </p>

                                {subscribed ? (
                                    <div className="flex items-center gap-3 border border-[#b89a5e]/30 rounded-xl px-4 py-3 bg-[#b89a5e]/06">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b89a5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span className="text-[#b89a5e] text-[11px] font-medium tracking-wide">
                                            You&apos;re subscribed. Thank you.
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                                            onFocus={() => setInputFocused(true)}
                                            onBlur={() => setInputFocused(false)}
                                            placeholder="your@email.com"
                                            className="ft-newsletter-input flex-1 bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-[11.5px] font-light placeholder:text-white/25"
                                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                                        />
                                        <button
                                            onClick={handleSubscribe}
                                            className="ft-newsletter-btn bg-[#b89a5e] text-[#1a1612] rounded-xl px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] whitespace-nowrap flex items-center gap-1.5"
                                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                                        >
                                            Subscribe
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                                <polyline points="12 5 19 12 12 19" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ═══ ADDRESS STRIP ═══ */}
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 py-6 border-b border-white/[0.06]">
                        {[
                            {
                                icon: (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#b89a5e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                                    </svg>
                                ),
                                text: "89, Kakrail, Green City Edge, Level–11, Dhaka 1217",
                                href: "https://maps.google.com/?q=89+Kakrail+Green+City+Edge+Dhaka+1217",
                            },
                            {
                                icon: (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#b89a5e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                ),
                                text: "+880 1714 879 265",
                                href: "tel:+8801714879265",
                            },
                            {
                                icon: (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#b89a5e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                                    </svg>
                                ),
                                text: "info@headroombd.com",
                                href: "mailto:info@headroombd.com",
                            },
                        ].map((item, i) => (
                            <a
                                key={i}
                                href={item.href}
                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                rel="noreferrer"
                                className="flex items-center gap-2 text-white/35 text-[11px] font-light tracking-wide hover:text-[#b89a5e] transition-colors duration-200"
                                style={{ textDecoration: "none" }}
                            >
                                {item.icon}
                                {item.text}
                            </a>
                        ))}
                    </div>

                    {/* ═══ BOTTOM BAR ═══ */}
                    <div className="flex flex-wrap items-center justify-between gap-4 py-5">
                        {/* Copyright */}
                        <p className="text-white/20 text-[10.5px] font-light tracking-wide">
                            © {currentYear}{" "}
                            <span className="text-white/35">Times Square, Tejgaon.</span>{" "}
                            All rights reserved.
                        </p>

                        {/* Legal links */}
                        <div className="flex items-center gap-5 flex-wrap">
                            {legalLinks.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className="ft-legal-link text-white/25 text-[10px] font-light tracking-wide"
                                    style={{ textDecoration: "none" }}
                                >
                                    {l.label}
                                </Link>
                            ))}
                            <span className="text-white/15 text-[10px] tracking-wide">
                                Designed by{" "}
                                <a
                                    href="https://headroombd.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[#b89a5e]/60 hover:text-[#b89a5e] transition-colors duration-200"
                                    style={{ textDecoration: "none" }}
                                >
                                    Headroom
                                </a>
                            </span>
                        </div>
                    </div>

                </div>

                {/* ── Bottom gradient line ── */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b89a5e]/30 to-transparent" />
            </footer>
        </>
    );
}