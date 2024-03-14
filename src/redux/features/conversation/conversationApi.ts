import { apiSlice } from "../api/apiSlice";

export const conversationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createNewConversation: builder.mutation({
            query: (data) => ({
                url: "/conversation/create-new-conversation",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
        }),
        getAllConversationofSeller: builder.query({
            query: (id) => ({
                url: `/conversation/get-all-conversation-seller/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        getAllConversationofUser: builder.query({
            query: (id) => ({
                url: `/conversation/get-all-conversation-user/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        updateLastMessage: builder.mutation({
            query: (data) => ({
                url: `/conversation/update-last-message/${data.id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            }),
        }),
    }),
});

export const {
    useCreateNewConversationMutation,
    useGetAllConversationofSellerQuery,
    useGetAllConversationofUserQuery,
    useUpdateLastMessageMutation
} = conversationApi;
