import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    seller: "",
}

const shopAuthSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {
        sellerRegistration: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
        },
        sellerLoggedIn: (state, action: PayloadAction<{ accessToken: string, seller: string }>) => {
            state.token = action.payload.accessToken;
            state.seller = action.payload.seller;
        },
        sellerLoggedOut: (state) => {
            state.token = "";
            state.seller = "";
        },
    }
});

export const { sellerRegistration, sellerLoggedIn, sellerLoggedOut } = shopAuthSlice.actions;

export default shopAuthSlice.reducer;

export type AuthState = typeof initialState;