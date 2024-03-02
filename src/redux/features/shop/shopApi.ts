import { apiSlice } from "../api/apiSlice";

export const shopApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateShopAvatar: builder.mutation({
            query: (avatar) => ({
                url: "/shop/update-shop-avatar",
                method: "PUT",
                body: { avatar },
                credentials: "include" as const,
            })
        }),
        updateShopProfile: builder.mutation({
            query: (data) => ({
                url: "/shop/update-shop-info",
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),
        updatePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: "/user/update-user",
                method: "PUT",
                body: { oldPassword, newPassword },
                credentials: "include" as const,
            })
        }),
        shopInfoById: builder.query({
            query: (id) => ({
                url: `/shop/get-shop-info/${id}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        updatePaymentMethod: builder.mutation({
            query: (data) => ({
                url: "/shop/update-payment-methods",
                method: "PUT",
                body: { data },
                credentials: "include" as const,
            })
        }),
        deleteWithdrawMethod: builder.mutation({
            query: () => ({
                url: "/shop/delete-withdraw-method",
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
        adminGetSellers: builder.query({
            query: () => ({
                url: "/shop/admin-all-sellers",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        adminUpdateShop: builder.mutation({
            query: (data) => ({
                url: `/shop/admin-update/${data.id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),
        adminDeleteShop: builder.mutation({
            query: (id) => ({
                url: `/shop/admin-delete-shop/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),

    })
});

export const { useShopInfoByIdQuery, useUpdateShopAvatarMutation, useAdminDeleteShopMutation, useAdminGetSellersQuery, useUpdatePaymentMethodMutation, useDeleteWithdrawMethodMutation, useAdminUpdateShopMutation, useUpdateShopProfileMutation, useUpdatePasswordMutation } = shopApi;