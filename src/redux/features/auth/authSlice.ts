import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { object, unknown } from "zod";

// interface InitialState {
//     token: string;
//     user: string;
//     seller: string;
// }

// export interface IUser {
//     fullName: string;
//     email: string;
//     password: string;
//     phoneNumber?: string; // Optional field
//     addresses?: {
//         country: string;
//         city: string;
//         address1: string;
//         address2?: string; // Optional field
//         pinCode: number;
//         addressType: string;
//     }[];
//     role?: 'USER' | 'ADMIN'; // Union type for role
//     avatar?: {
//         public_id: string;
//         url: string;
//     };
//     createdAt?: Date;
//     updatedAt?: Date;
// }

// interface InitialState{
//     token: string;
//     user: IUser;
//     seller: string;
// }

const initialState = {
    isLoading: true,
    shopLoading: true,
    token: "",
    reset_token: "",
    shop_reset_token: "",
    seller_access_token: "",
    user: "",
    seller: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
        },
        userLoggedIn: (state, action: PayloadAction<{ accessToken: string, user: string }>) => {
            state.isLoading = true;
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
            state.isLoading = false;
        },
        userForgotPassword: (state, action: PayloadAction<{ resetToken: string }>) => {
            state.reset_token = action.payload.resetToken;
            console.log("Reset token", state.reset_token);
        },
        userLoggedOut: (state) => {
            state.token = "";
            state.user = "";
        },
        sellerRegistration: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
        },
        sellerLoggedIn: (state, action: PayloadAction<{ seller_access_token: string, seller: string }>) => {
            state.shopLoading = true;
            state.seller_access_token = action.payload.seller_access_token;
            state.seller = action.payload.seller;
            state.shopLoading = false;
        },
        sellerForgotPassword: (state, action: PayloadAction<{ resetToken: string }>) => {
            state.shop_reset_token = action.payload.resetToken;
            console.log("Reset token", state.reset_token);
        },
        sellerLoggedOut: (state) => {
            state.seller_access_token = "";
            state.seller = "";
        },
    }
});

export const { userRegistration, userForgotPassword, userLoggedIn, userLoggedOut,
    sellerRegistration, sellerLoggedIn, sellerForgotPassword, sellerLoggedOut } = authSlice.actions;

export default authSlice.reducer;

export type AuthState = typeof initialState;