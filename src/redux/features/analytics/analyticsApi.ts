import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsersAnalytics: builder.query({
            query: () => ({
                url: "/analytic//admin-get-users",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getSellersAnalytics: builder.query({
            query: () => ({
                url: "/analytic/admin-get-shops",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getProductsAnalytics: builder.query({
            query: () => ({
                url: "/analytic/admin-get-products",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getEventsAnalytics: builder.query({
            query: () => ({
                url: "/analytic/admin-get-events",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getOrdersAnalytics: builder.query({
            query: () => ({
                url: "/analytic/admin-get-orders",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getWithdrawsAnalytics: builder.query({
            query: () => ({
                url: "/analytic/admin-get-withdraws",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getCouponsAnalytics: builder.query({
            query: () => ({
                url: "/analytic/admin-get-coupons",
                method: "GET",
                credentials: "include" as const,
            })
        })
    })
});

export const { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery,
    useGetCouponsAnalyticsQuery, useGetEventsAnalyticsQuery, useGetWithdrawsAnalyticsQuery,
    useGetProductsAnalyticsQuery, useGetSellersAnalyticsQuery } = analyticsApi;