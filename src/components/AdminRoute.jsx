import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {Navigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import {checkAuthStatus} from "../store/slices/authSlice.js";
import Loading from '../components/Loading';

// Admin Route Component
const AdminRoute = ({ children }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isAdmin, setIsAdmin] = React.useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const authStatus = await dispatch(checkAuthStatus());
                const userData = JSON.parse(Cookies.get('userData') || '{}');
                setIsAdmin(authStatus && userData.isAdmin);
            } catch (error) {
                setIsAdmin(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, [dispatch]);

    if (isLoading) {
        return <Loading />;
    }

    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute