import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {useTranslation} from "react-i18next";
import toast from "react-hot-toast";

const Logout = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {

        if(Cookies.get('isLoggedIn')){

            Cookies.remove('isLoggedIn');
            Cookies.remove('uData');
            Cookies.remove('tkn');

            toast.success('You have been successfully logged out.');


        } else {
            navigate('/');
        }
    })

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default Logout;