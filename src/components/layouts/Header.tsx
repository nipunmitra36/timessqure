"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "../theme/ThemeToggle";
import GlobalSearch from "../theme/GlobalSearch";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Brand */}
                    <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
                        NipunDev
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                            >
                                {item.label}
                            </Link>
                        ))}


                        <ThemeToggle />
                        {/* <GlobalSearch /> */}

                    </nav>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-md border"
                    >
                        <span className="sr-only">Toggle Menu</span>
                        ☰
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-2 pb-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>

           
        </header>
    );
}