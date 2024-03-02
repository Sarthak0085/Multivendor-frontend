import { apiSlice } from "../api/apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStripeApiKey: builder.query({
      query: () => ({
        url: "/payment/stripePublishablekey",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    paymentProcess: builder.mutation({
      query: (data) => ({
        url: `/payment/process`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetStripeApiKeyQuery, usePaymentProcessMutation } =
  paymentApi;
