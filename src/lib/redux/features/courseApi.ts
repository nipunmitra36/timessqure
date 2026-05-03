import { baseApi } from "@/lib/redux/api/baseApi";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // GET all courses
    getCourses: builder.query({
      query: () => "/courses",
    }),

    // GET single course (optional)
    getCourseById: builder.query({
      query: (id) => `/courses/${id}`,
    }),

    // POST create course (optional)
    createCourse: builder.mutation({
      query: (data: any) => ({
        url: "/courses",
        method: "POST",
        body: data,
      }),
    }),

  }),
});

// auto generated hooks
export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
} = courseApi;