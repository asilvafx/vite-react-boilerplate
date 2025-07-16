import React, {useEffect} from "react";
import {useAuth} from "../hooks/useAuth";
import Loading from "./Loading";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) return <Loading />;
    if (!isAuthenticated) return <Navigate to="/auth" />;
    return children;
};

export default ProtectedRoute;