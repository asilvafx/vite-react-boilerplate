import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkLoginStatus } from '../lib/user';

const PrivateRoute = () => {
    if (!checkLoginStatus){
        return <Navigate to="/" />;
    }  

    return <Outlet />;
};

export default PrivateRoute;
