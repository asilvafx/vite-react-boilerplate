import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {Navigate} from 'react-router-dom';
import { checkAuthStatus } from '../store/slices/authSlice';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const authStatus = await dispatch(checkAuthStatus());
                setIsAuthenticated(authStatus);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, [dispatch]);

    if (isLoading) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" />;
    }

    return children;
};

export default ProtectedRoute