"use client";

import Link from "next/link";

const footerLinks = [
    {
        title: "Company",
        links: [
            { label: "About", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Blog", href: "/blog" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "Contact", href: "/contact" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Brand */}
                    <div>
                        <h2 className="text-xl font-bold text-white">NipunDev</h2>
                        <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                            Building scalable web solutions with modern technologies and clean architecture.
                        </p>
                    </div>

                    {/* Links */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-semibold text-white mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm hover:text-white transition"
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
                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between">

                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} NipunDev. All rights reserved.
                    </p>

                    {/* Social / Extra Placeholder */}
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white text-sm transition">
                            Facebook
                        </Link>
                        <Link href="#" className="hover:text-white text-sm transition">
                            LinkedIn
                        </Link>
                        <Link href="#" className="hover:text-white text-sm transition">
                            GitHub
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}