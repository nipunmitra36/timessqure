import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://api.example.com/",
    baseUrl: "https://api.cwskills.com/api/",
  }),
  endpoints: () => ({}),
});