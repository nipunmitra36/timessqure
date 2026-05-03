// src/app/components/GlobalSearch.tsx
'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { courseApi } from '../../app/lib/redux/features/courseApi';

export default function GlobalSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter();

    const { data } = courseApi.useGetCoursesQuery(null);
    const allCourses = Array.isArray(data?.data?.data) ? data.data.data : [];

    // Filter courses based on query
    const results = query.length > 1
        ? allCourses.filter((course: any) =>
            course.title.toLowerCase().includes(query.toLowerCase()) ||
            course.category?.name.toLowerCase().includes(query.toLowerCase()) ||
            course.level?.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    // Open with Ctrl+K
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            setIsOpen(prev => !prev);
        }
        if (e.key === 'Escape') setIsOpen(false);
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const handleSelect = (slug: string) => {
        router.push(`/courses/${slug}`);
        setIsOpen(false);
        setQuery('');
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-4">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">

                    {/* Search Input */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-400 text-lg">🔍</span>
                        <input
                            autoFocus
                            type="text"
                            placeholder="Search courses..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 bg-transparent text-gray-800 dark:text-white placeholder-gray-400 outline-none text-sm"
                        />
                        <kbd className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            ESC
                        </kbd>
                    </div>

                    {/* Results */}
                    <div className="max-h-80 overflow-y-auto">
                        {query.length > 1 && results.length === 0 && (
                            <p className="text-center text-gray-400 text-sm py-8">
                                No courses found for "<span className="font-medium">{query}</span>"
                            </p>
                        )}

                        {query.length <= 1 && (
                            <p className="text-center text-gray-400 text-sm py-8">
                                Type to search courses...
                            </p>
                        )}

                        {results.map((course: any) => (
                            <button
                                key={course.id}
                                onClick={() => handleSelect(course.slug)}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                            >
                                {/* Thumbnail */}
                                <img
                                    src={course.thumbnail_url}
                                    alt={course.title}
                                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                                />
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                                        {course.title}
                                    </p>
                                    <p className="text-xs text-gray-400 capitalize">
                                        {course.category?.name} • {course.level}
                                    </p>
                                </div>
                                {/* Price */}
                                <span className="text-sm font-semibold text-blue-600 flex-shrink-0">
                                    {course.is_free ? 'Free' : `৳${course.discount_price}`}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-4 px-4 py-2 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400">
                        <span>⬆⬇ navigate</span>
                        <span>↵ select</span>
                        <span>ESC close</span>
                    </div>
                </div>
            </div>
        </>
    );
}