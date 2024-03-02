import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => ({
                url: `category/get-all`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        adminAddCategory: builder.mutation({
            query: (data) => ({
                url: `category/admin-add`,
                method: "POST",
                body: data,
                credentials: "include" as const,
            })
        }),
        adminUpdateCategory: builder.mutation({
            query: (data) => ({
                url: `/category/admin-update/${data?.id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),
        adminDeleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/admin-delete/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
        adminGetAllCategory: builder.query({
            query: () => ({
                url: `/category/admin-get-all`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        adminGetCategorybyId: builder.query({
            query: (id) => ({
                url: `/category/get/${id}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
    })
});

export const { useGetAllCategoryQuery, useAdminGetCategorybyIdQuery, useAdminAddCategoryMutation, useAdminUpdateCategoryMutation, useAdminDeleteCategoryMutation, useAdminGetAllCategoryQuery } = categoryApi;