import { apiSlice } from "../api/apiSlice";

export const eventApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createEvent: builder.mutation({
            query: (data) => ({
                url: "/event/create",
                method: "POST",
                body: data,
                credentials: "include" as const,
            })
        }),
        getAllShopEvents: builder.query({
            query: (shopId) => ({
                url: `/event//get-all-events/${shopId}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getEventById: builder.query({
            query: (id) => ({
                url: `/event/get-event/${id}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getAllEvents: builder.query({
            query: () => ({
                url: `/event/get-all-events`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        // createNewReview: builder.mutation({
        //     query: () => ({
        //         url: `/product/create-new-review`,
        //         method: "PUT",
        //         credentials: "include" as const,
        //     })
        // }),
        // updateProduct: builder.mutation({
        //     query: ({ productId, data }) => ({
        //         url: `/product/update/${productId}`,
        //         method: "PUT",
        //         body: data,
        //         credentials: "include" as const,
        //     })
        // }),
        deleteShopEvent: builder.mutation({
            query: (eventId) => ({
                url: `/event/delete-shop-event/${eventId}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
        // updateUserRole: builder.mutation({
        //     query: ({ role }) => ({
        //         url: "/update-user-role",
        //         method: "PUT",
        //         body: { role },
        //         credentials: "include" as const,
        //     })
        // }),
        adminGetAllEvents: builder.query({
            query: () => ({
                url: "/event/admin-all-events",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        adminDeleteEventById: builder.mutation({
            query: (id) => ({
                url: `/event/admin-delete/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
    })
});

export const { useCreateEventMutation, useGetEventByIdQuery, useAdminDeleteEventByIdMutation, useAdminGetAllEventsQuery, useDeleteShopEventMutation, useGetAllEventsQuery, useGetAllShopEventsQuery } = eventApi;