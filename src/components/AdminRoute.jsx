import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from 'react-hot-toast';

const AdminRoute = () => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!user?.isAdmin) {
        toast.error('Access denied. Admin privileges required.');
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default AdminRoute;
