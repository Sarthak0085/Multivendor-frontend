import { apiSlice } from "../api/apiSlice";

export const withdrawApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllWithdrawRequestByAdmin: builder.query({
      query: () => ({
        url: "/withdraw/admin-get-all-withdraw-request",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createWithdrawRequestBySeller: builder.mutation({
      query: (data) => ({
        url: `/withdraw/create-withdraw-request`,
        method: "POST",
        body: { data },
        credentials: "include" as const,
      }),
    }),
    updateWithdrawRequestByAdmin: builder.mutation({
      query: ({ data, id }) => ({
        url: `/withdraw//update-withdraw-request/${id}`,
        method: "PUT",
        body: { data },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateWithdrawRequestBySellerMutation,
  useGetAllWithdrawRequestByAdminQuery,
  useUpdateWithdrawRequestByAdminMutation,
} = withdrawApi;
