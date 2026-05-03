// Types
export interface Course {
    id: number;
    title: string;
    slug: string;
    thumbnail_url: string;
    price: string;
    discount_price: string;
    discount_percentage: number;
    level: string;
    course_type: string;
    duration_hours: string;
    total_lectures: number;
    total_students: number;
    avg_rating: string;
    is_free: boolean;
    language: string;
    instructor: {
        name: string;
    };
    category: {
        name: string;
    };
}