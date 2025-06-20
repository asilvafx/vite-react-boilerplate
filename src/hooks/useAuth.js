// src/hooks/useAuth.js
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logout } from "../store/slices/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    return {
        user,
        isAuthenticated,
        login: (userData) => dispatch(loginSuccess(userData)),
        logout: () => dispatch(logout()),
    };
};
