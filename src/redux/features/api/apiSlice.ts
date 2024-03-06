import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { sellerLoggedIn, userLoggedIn } from "../auth/authSlice";
// import { Wishlist } from "../../../types/Wishlist";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_PUBLIC_API_URL,
    }),
    endpoints: (builder) => ({
        // refreshToken: builder.query({
        //     query: () => ({
        //         url: "/refresh-token",
        //         method: "GET",
        //         credentials: "include" as const,
        //     })
        // }),
        loadUser: builder.query({
            query: () => ({
                url: "/user/get-user",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    )
                    console.log("result", result);

                } catch (error) {
                    console.log(error);

                }
            }
        }),
        loadSeller: builder.query({
            query: () => ({
                url: "/shop/get-shop",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        sellerLoggedIn({
                            seller_access_token: result.data.accessToken,
                            seller: result.data.seller
                        })
                    )
                    console.log(result);
                } catch (error) {
                    console.log(error);

                }
            }
        }),
    })
});

export const { useLoadUserQuery, useLoadSellerQuery } = apiSlice;