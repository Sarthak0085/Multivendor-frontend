import { apiSlice } from "../api/apiSlice";

export const MessageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createNewMessage: builder.mutation({
            query: (data) => ({
                url: "/message/create-new-message",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
        }),
        getAllMessageByConversationId: builder.query({
            query: (id) => ({
                url: `/message/get-all-messages/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
    }),
});

export const {
    useCreateNewMessageMutation,
    useGetAllMessageByConversationIdQuery,
} = MessageApi;
