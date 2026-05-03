'use client';
import React from 'react';
// API Slices 
import { courseApi } from "@/lib/redux/features/courseApi";
import { Skeleton } from 'boneyard-js/react'
import { Course } from "@/types/course";



export default function CoursesList() {
    
    const { data, isLoading, error } = courseApi.useGetCoursesQuery(null);

    const courses: Course[] = Array.isArray(data?.data?.data) ? data.data.data : [];

    if (error) return (
        <div className="flex justify-center items-center min-h-40">
            <p className="text-red-500 text-lg">Something went wrong. Please try again.</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">All Courses</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {/* When loading → show 8 skeleton cards */}
                {isLoading && Array.from({ length: 8 }).map((_, i) => (
                    <CourseCard key={i} loading={true} />
                ))}

                {/* When data loaded */}
                {!isLoading && courses.map((course) => (
                    <CourseCard key={course.id} course={course} loading={false} />
                ))}

            </div>
        </div>
    );
}

function CourseCard({ course, loading }: { course?: Course; loading: boolean }) {
    return (
        <Skeleton name="course-card" loading={loading}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">

                {/* Thumbnail */}
                <div className="relative">
                    <img
                        src={course?.thumbnail_url}
                        alt={course?.title}
                        className="w-full h-48 object-cover"
                    />

                    {course?.discount_percentage! > 0 && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {course?.discount_percentage}% OFF
                        </span>
                    )}

                    {course?.is_free && (
                        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                            FREE
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">

                    <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">
                        {course?.category?.name}
                    </span>

                    <h3 className="text-sm font-bold text-gray-800 mb-2 line-clamp-2 leading-snug">
                        {course?.title}
                    </h3>

                    <p className="text-xs text-gray-500 mb-3">
                        By <span className="font-medium text-gray-700">{course?.instructor?.name}</span>
                    </p>

                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                        <span>⏱ {course?.duration_hours}h</span>
                        <span>📚 {course?.total_lectures} lectures</span>
                        <span>👥 {course?.total_students}</span>
                    </div>

                    <div className="flex gap-2 mb-4">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded capitalize">
                            {course?.level}
                        </span>
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded capitalize">
                            {course?.course_type}
                        </span>
                    </div>

                    <div className="flex-1" />

                    <div className="flex items-center justify-between mt-2">
                        <div>
                            {course?.is_free ? (
                                <span className="text-green-600 font-bold text-lg">Free</span>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600 font-bold text-lg">
                                        ৳{course?.discount_price}
                                    </span>
                                    {course?.discount_percentage! > 0 && (
                                        <span className="text-gray-400 text-sm line-through">
                                            ৳{course?.price}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <span className="text-xs text-yellow-500 font-semibold">
                            ⭐ {course?.avg_rating ? parseFloat(course.avg_rating).toFixed(1) : '0.0'}
                        </span>
                    </div>

                    <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors duration-200">
                        Enroll Now
                    </button>

                </div>
            </div>
        </Skeleton>
    );
}