import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute = () => {
    const { checkLoginStatus } = useAuth();
    if (!checkLoginStatus){
        return <Navigate to="/" />;
    }  

    return <Outlet />;
};

export default PrivateRoute;
