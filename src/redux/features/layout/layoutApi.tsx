import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroLayout: builder.query({
      query: (type) => ({
        url: `/layout/get/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: `/layout/edit`,
        method: "PUT",
        body: {
          type,
          image,
          title,
          subTitle,
          faq,
          categories,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetHeroLayoutQuery, useEditLayoutMutation } = layoutApi;
