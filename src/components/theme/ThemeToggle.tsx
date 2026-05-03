// src/app/components/ThemeToggle.tsx
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className={`relative inline-flex items-center w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none
                ${isDark ? 'bg-gray-900' : 'bg-gray-300'}`}
        >
            <span
                className={`absolute left-0.5 w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center text-[9px]
                    ${isDark ? 'translate-x-5 bg-white' : 'translate-x-0 bg-white'}`}
            >
                {isDark ? '🌙' : '☀️'}
            </span>
        </button>
    );
}