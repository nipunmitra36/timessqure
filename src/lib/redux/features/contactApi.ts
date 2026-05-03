import { baseApi } from "@/lib/redux/api/baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContact: builder.query({
      query: () => "contact/",
    }),

    createContact: builder.mutation({
      query: (body) => ({
        url: "contact/store",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetContactQuery, useCreateContactMutation } = contactApi;