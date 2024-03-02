import { apiSlice } from "../api/apiSlice";
// import { Wishlist } from "../../../types/Wishlist";

// interface CacheTag {
//   type: string;
// }

// const wishlistTag: CacheTag = { type: 'Wishlist' };

export const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlist/add-wishlist",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      // invalidatesTags: [{ type: 'Wishlist'}]
    }),
    RemoveFromWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlist/remove-wishlist",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      // invalidatesTags: [{ type: 'Wishlist'}]
    }),
    emptyWishlist: builder.mutation({
      query: () => ({
        url: "/wishlist/empty-wishlist",
        method: "DELETE",
        credentials: "include" as const,
      }),
      // invalidatesTags: [{ type: 'Wishlist'}]
    }),
    getWishlist: builder.query({
      query: (userId) => ({
        url: `/wishlist/get-wishlist/${userId}`,
        method: "GET",
        credentials: "include" as const,
      }),
      // providesTags: [{type: 'Wishlist'}]
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useEmptyWishlistMutation,
  useGetWishlistQuery,
} = wishlistApi;
