import { apiSlice } from "../api/apiSlice";

export const brandApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBrand: builder.query({
            query: () => ({
                url: `brand/get-all`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        adminAddBrand: builder.mutation({
            query: (data) => ({
                url: `brand/admin-add`,
                method: "POST",
                body: data,
                credentials: "include" as const,
            })
        }),
        adminGetBrandById: builder.query({
            query: (id) => ({
                url: `brand/get/${id}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        adminUpdateBrand: builder.mutation({
            query: (data) => ({
                url: `brand/admin-update/${data?.id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),
        adminDeleteBrand: builder.mutation({
            query: (id) => ({
                url: `brand/admin-delete/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
        adminGetAllBrand: builder.query({
            query: () => ({
                url: `brand/admin-get-all`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
    })
});

export const { useGetAllBrandQuery, useAdminGetBrandByIdQuery, useAdminAddBrandMutation, useAdminUpdateBrandMutation, useAdminDeleteBrandMutation, useAdminGetAllBrandQuery } = brandApi;