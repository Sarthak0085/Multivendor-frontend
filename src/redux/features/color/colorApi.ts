import { apiSlice } from "../api/apiSlice";

export const colorApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllColor: builder.query({
            query: () => ({
                url: `color/get-all`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        adminAddColor: builder.mutation({
            query: (data) => ({
                url: `color/admin-add`,
                method: "POST",
                body: data,
                credentials: "include" as const,
            })
        }),
        adminUpdateColor: builder.mutation({
            query: ({ id, data }) => ({
                url: `color/admin-update/${id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),
        adminDeleteColor: builder.mutation({
            query: (id) => ({
                url: `color/admin-delete/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
        adminGetAllColor: builder.query({
            query: () => ({
                url: `color/admin-get-all`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
    })
});

export const { useGetAllColorQuery, useAdminAddColorMutation, useAdminUpdateColorMutation, useAdminDeleteColorMutation, useAdminGetAllColorQuery } = colorApi;