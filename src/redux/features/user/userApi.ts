import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: ({ avatar }) => ({
                url: "/user/update-avatar",
                method: "PUT",
                body: avatar,
                credentials: "include" as const,
            })
        }),
        editProfile: builder.mutation({
            query: (data) => ({
                url: "/user/update-user-info",
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),
        updatePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: "/user/update-password",
                method: "PUT",
                body: { oldPassword, newPassword },
                credentials: "include" as const,
            })
        }),
        updateAddress: builder.mutation({
            query: (data) => ({
                url: "/user/update-user-address",
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `/user/delete-user-address/${id}`,
                method: "PUT",
                // body: data,
                credentials: "include" as const,
            })
        }),
        getUserInfoById: builder.query({
            query: (id) => ({
                url: `/user/user-info/${id}`,
                method: "GET",
                // body: data,
                credentials: "include" as const,
            })
        }),
        adminUpdateUser: builder.mutation({
            query: (data) => ({
                url: `/user/admin-update/${data.id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),
        adminGetUsers: builder.query({
            query: () => ({
                url: "/user/admin-all-users",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        adminDeleteUser: builder.mutation({
            query: (id) => ({
                url: `/user/admin-delete-user/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),

    })
});

export const { useUpdateAvatarMutation, useEditProfileMutation, useUpdatePasswordMutation, useUpdateAddressMutation, useDeleteAddressMutation, useGetUserInfoByIdQuery, useAdminUpdateUserMutation, useAdminGetUsersQuery, useAdminDeleteUserMutation } = userApi;