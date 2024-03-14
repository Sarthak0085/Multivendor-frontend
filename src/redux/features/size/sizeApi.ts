import { apiSlice } from "../api/apiSlice";

export const sizeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllSize: builder.query({
            query: () => ({
                url: `size/get-all`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        adminAddSize: builder.mutation({
            query: (data) => ({
                url: `size/admin-add`,
                method: "POST",
                body: data,
                credentials: "include" as const,
            })
        }),
        adminDeleteSize: builder.mutation({
            query: (id) => ({
                url: `size/admin-delete/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
        adminGetAllSize: builder.query({
            query: () => ({
                url: `size/admin-get-all`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
    })
});

export const { useGetAllSizeQuery, useAdminAddSizeMutation, useAdminDeleteSizeMutation, useAdminGetAllSizeQuery } = sizeApi;