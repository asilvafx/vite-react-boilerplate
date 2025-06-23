// src/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { decryptHash } from "../../lib/crypto";

let storedUser = null;
try {
    const encrypted = Cookies.get("authUser");
    if (encrypted) {
        storedUser = JSON.parse(decryptHash(encrypted));
    }
} catch (e) {
    storedUser = null;
    Cookies.remove("authUser");
}

const initialState = {
    user: storedUser,
    isAuthenticated: !!storedUser,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            Cookies.remove("authUser");
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
