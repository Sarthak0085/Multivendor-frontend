import { apiSlice } from "../api/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addToCart: builder.mutation({
            query: (data) => ({
                url: "/cart/add-cart",
                method: "POST",
                body: data,
                credentials: "include" as const,
            })
        }),
        RemoveFromCart: builder.mutation({
            query: (data) => ({
                url: "/cart/remove-cart",
                method: "POST",
                body: data,
                credentials: "include" as const,
            })
        }),
        emptyCart: builder.mutation({
            query: (userId) => ({
                url: `/cart/empty-cart/${userId}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
        getCart: builder.query({
            query: (userId) => ({
                url: `/cart/get-cart/${userId}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
    })
});

export const { useAddToCartMutation, useEmptyCartMutation, useGetCartQuery, useRemoveFromCartMutation } = cartApi;
