import { apiSlice } from "../api/apiSlice";
import { sellerLoggedIn, sellerLoggedOut, sellerRegistration } from "./shopAuthSlice";


export const shopAuthApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //endpoints here
        shopRegister: builder.mutation({
            query: (data) => ({
                url: "/auth/create-shop",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        sellerRegistration({
                            token: result.data.activationToken
                        })
                    )
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        shopActivation: builder.mutation({
            query: ({ activation_token, activation_code }) => ({
                url: "/auth/activation-shop",
                method: "POST",
                body: { activation_token, activation_code },
            }),
        }),
        shopLogin: builder.mutation({
            query: ({ email, password }) => ({
                url: "/auth/login-shop",
                method: "POST",
                body: {
                    email, password,
                },
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        sellerLoggedIn({
                            accessToken: result.data.accessToken,
                            seller: result.data.seller
                        })
                    )
                } catch (error) {
                    console.log(error);

                }
            }
        }),
        // socialAuth: builder.mutation({
        //     query: ({ email, name, avatar }) => ({
        //         url: "/social-auth",
        //         method: "POST",
        //         body: {
        //             email, name, avatar
        //         },
        //         credentials: "include" as const,
        //     }),
        //     async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //         try {
        //             const result = await queryFulfilled;
        //             dispatch(
        //                 userLoggedIn({
        //                     accessToken: result.data.accessToken,
        //                     user: result.data.user
        //                 })
        //             )
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     }
        // }),
        shopLogout: builder.query({
            query: () => ({
                url: "/auth/logout-shop",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { dispatch }) {
                try {
                    dispatch(
                        sellerLoggedOut()
                    )
                } catch (error) {
                    console.log(error);

                }
            }
        })
    })
})

export const { useShopLoginMutation,
    useShopRegisterMutation, useShopActivationMutation, useShopLogoutQuery } = shopAuthApi;