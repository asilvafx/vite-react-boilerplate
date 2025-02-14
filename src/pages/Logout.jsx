import React from 'react';
import { useAuth } from "../context/AuthProvider";

const Logout = () => {

    const user = useAuth();

    user.logOut();

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default Logout;