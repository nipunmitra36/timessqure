"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "../theme/ThemeToggle";

const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "#" },
    { label: "Location", href: "#" },
    { label: "Floor Plans", href: "#" },
    { label: "Investment", href: "#" },
    { label: "Amenities", href: "#" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full sticky top-0 z-50 bg-[#1a1612]/97 backdrop-blur-md border-b border-[#EEA62A]/25"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">

                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
                        <div className="w-8 h-8 border border-[#EEA62A]/60 rounded-sm flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 1L14 5v6l-6 4L2 11V5L8 1z" stroke="#EEA62A" strokeWidth="1.2" />
                                <path d="M8 5v6M5 6.5l3-2 3 2" stroke="#EEA62A" strokeWidth="1" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span
                                className="text-white font-bold text-[20px] leading-none tracking-tight"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                                Times Square
                            </span>
                            <span
                                className="text-[#EEA62A] text-[9px] uppercase tracking-[0.18em] font-light"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                                Premium Properties
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-[11px] uppercase text-white/60 hover:text-white
                           px-3.5 h-16 flex items-center border-b-2 border-transparent
                           hover:border-[#EEA62A] transition-all duration-200 whitespace-nowrap"
                                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.08em", fontWeight: 500 }}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <Link
                            href="/book"
                            className="ml-3 bg-[#EEA62A] hover:bg-[#d4b87a] text-[#1a1612] px-5 py-2.5
                         text-[10px] uppercase font-semibold rounded-sm
                         flex items-center gap-2 transition-all duration-200 hover:-translate-y-px"
                            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.14em" }}
                        >
                            Book Now <span className="text-sm">→</span>
                        </Link>

                        {/* <div className="ml-3">
                            <ThemeToggle />
                        </div> */}
                    </nav>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden flex items-center gap-2 px-3 py-2 border border-[#EEA62A]/30
                       text-white text-sm rounded-sm"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                        {isOpen ? "✕ Close" : "☰ Menu"}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden pb-4 pt-2 border-t border-[#EEA62A]/20">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block px-2 py-3 text-sm text-white/80 hover:text-white
                           border-b border-white/5"
                                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.06em" }}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/book"
                            className="mt-3 block text-center bg-[#EEA62A] text-[#1a1612] py-3
                         text-xs uppercase font-semibold rounded-sm"
                            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.14em" }}
                            onClick={() => setIsOpen(false)}
                        >
                            Book Now →
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}