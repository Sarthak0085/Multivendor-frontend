import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsersAnalytics: builder.query({
            query: (timeFrame) => ({
                url: `/analytic/admin-get-users?timeFrame=${timeFrame}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getSellersAnalytics: builder.query({
            query: (timeFrame) => ({
                url: `/analytic/admin-get-shops?timeFrame=${timeFrame}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getProductsAnalytics: builder.query({
            query: (timeFrame) => ({
                url: `/analytic/admin-get-products?timeFrame=${timeFrame}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getEventsAnalytics: builder.query({
            query: (timeFrame) => ({
                url: `/analytic/admin-get-events?timeFrame=${timeFrame}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getOrdersAnalytics: builder.query({
            query: (timeFrame) => ({
                url: `/analytic/admin-get-orders?timeFrame=${timeFrame}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getWithdrawsAnalytics: builder.query({
            query: (timeFrame) => ({
                url: `/analytic/admin-get-withdraws?timeFrame=${timeFrame}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getCouponsAnalytics: builder.query({
            query: (timeFrame) => ({
                url: `/analytic/admin-get-coupons?timeFrame=${timeFrame}`,
                method: "GET",
                credentials: "include" as const,
            })
        })
    })
});

export const { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery,
    useGetCouponsAnalyticsQuery, useGetEventsAnalyticsQuery, useGetWithdrawsAnalyticsQuery,
    useGetProductsAnalyticsQuery, useGetSellersAnalyticsQuery } = analyticsApi;