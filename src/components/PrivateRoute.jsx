import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkLoginStatus } from '../lib/user';

const PrivateRoute = () => {
    // Call the function to get the actual login status
    const isLoggedIn = checkLoginStatus();

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoute;