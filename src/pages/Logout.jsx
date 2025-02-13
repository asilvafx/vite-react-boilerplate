import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear cookies
        Cookies.remove('isLoggedIn');
        Cookies.remove('uData');
        Cookies.remove('tkn');

        // Redirect to home page
        navigate('/');
    }, [navigate]);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default Logout;