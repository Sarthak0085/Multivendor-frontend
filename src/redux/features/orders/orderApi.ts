import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: "/order/create",
                method: "POST",
                body: data,
                credentials: "include" as const,
            })
        }),
        refundRequestByUser: builder.mutation({
            query: (data) => ({
                url: `/order/refund-request/${data.orderId}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),
        orderUpdateStatusBySeller: builder.mutation({
            query: (data) => ({
                url: `/order/update-status/${data.orderId}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),
        getAllOrdersByUser: builder.query({
            query: (userId) => ({
                url: `/order/get-all/${userId}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getAllOrdersBySeller: builder.query({
            query: (shopId) => ({
                url: `/order/get-all-shop/${shopId}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        refundSuccessBySeller: builder.mutation({
            query: ({ orderId, data }) => ({
                url: `/order/refund-success/${orderId}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),
        adminGetAllOrders: builder.query({
            query: () => ({
                url: "/order/admin-get-all",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        adminOrderUpdateStatus: builder.mutation({
            query: (data) => ({
                url: `/order/admin-update-status/${data.orderId}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),
    })
});

export const { useCreateOrderMutation, useAdminOrderUpdateStatusMutation, useOrderUpdateStatusBySellerMutation, useAdminGetAllOrdersQuery, useGetAllOrdersBySellerQuery, useGetAllOrdersByUserQuery, useRefundRequestByUserMutation, useRefundSuccessBySellerMutation } = orderApi;