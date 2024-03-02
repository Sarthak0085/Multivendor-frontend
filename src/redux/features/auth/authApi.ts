import { apiSlice } from "../api/apiSlice";
import { sellerForgotPassword, sellerLoggedIn, sellerLoggedOut, sellerRegistration, userForgotPassword, userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";


type RegistrationResponse = {
    message: string,
    activationToken: string,
}

type RegistrationData = {
    fullName: string;
    email: string;
    password: string;
};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //endpoints here
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "/auth/create-user",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken
                        })
                    )
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("result:", result);

                    dispatch(
                        userForgotPassword({
                            resetToken: result.data.resetToken,
                        })
                    )
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        activation: builder.mutation({
            query: ({ activation_token, activation_code }) => ({
                url: "/auth/activation-user",
                method: "POST",
                body: { activation_token, activation_code },
            }),
        }),
        resetPassword: builder.mutation({
            query: ({ reset_token, reset_otp, newPassword }) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: { reset_token, reset_otp, newPassword },
            }),
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "/auth/login-user",
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
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    )
                } catch (error) {
                    console.log(error);

                }
            }
        }),
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
        shopForgotPassword: builder.mutation({
            query: (data) => ({
                url: "/auth/forgot-shop-password",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("result:", result);

                    dispatch(
                        sellerForgotPassword({
                            resetToken: result.data.resetToken,
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
                            seller_access_token: result.data.accessToken,
                            seller: result.data.seller
                        })
                    )
                } catch (error) {
                    console.log(error);

                }
            }
        }),
        resetShopPassword: builder.mutation({
            query: ({ reset_token, reset_otp, newPassword }) => ({
                url: "/auth/reset-shop-password",
                method: "POST",
                body: { reset_token, reset_otp, newPassword },
            }),
        }),
        socialAuth: builder.mutation({
            query: ({ email, name, avatar }) => ({
                url: "/social-auth",
                method: "POST",
                body: {
                    email, name, avatar
                },
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    )
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { dispatch }) {
                try {
                    dispatch(
                        userLoggedOut()
                    )
                } catch (error) {
                    console.log(error);

                }
            }
        }),
        shopLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout-shop",
                method: "POST",
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

export const { useRegisterMutation, useActivationMutation, useForgotPasswordMutation, useResetPasswordMutation, useLoginMutation,
    useSocialAuthMutation, useLogoutMutation, useShopLoginMutation,
    useShopRegisterMutation, useShopForgotPasswordMutation, useResetShopPasswordMutation, useShopActivationMutation, useShopLogoutMutation } = authApi;