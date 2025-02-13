import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import {checkLoginStatus} from "../lib/auth.js";

const PrivateRoute = () => {
    const user = useAuth();
    if (!user.token){
        return <Navigate to="/" />;
    } else
    if(!checkLoginStatus()){
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
