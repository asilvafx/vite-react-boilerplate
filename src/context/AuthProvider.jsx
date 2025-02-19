import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import DBService from '../data/db.service';
import { decryptHash, encryptHash } from "../lib/crypto.js";
import toast from 'react-hot-toast';
import { createWallet } from '../lib/web3';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser ] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");

    const registerAction = async (data) => {
        try {
            const userCheck = await DBService.getItemByKeyValue('email', data.username, 'users');

            if (userCheck) {
                toast.error('Email address already exists in our system!');
                return false;
            }

            const web3_account = await createWallet;

            const userData = {
                email: data.username,
                password: encryptHash(data.password),
                displayName: data.fullName,
                web3_address: web3_account.address,
                web3_pk: encryptHash(web3_account.privateKey),
                web3_custom_token_balance: "0.000",
                web3_network_token_balance: "0.000",
                world_id: null,
                is_admin: false,
            };

            try {
                await DBService.create(userData, 'users');
                toast.success("Registration successful!");
                return true;
            } catch (error) {
                console.error("Error creating user:", error);
                toast.error("Registration failed. Please try again.");
                return false;
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const loginAction = async (data) => {
        try {
            const userData = await DBService.getItemByKeyValue('email', data.username, 'users');

            if (!userData) {
                return 'Error: Invalid credentials.'; // Return error message
            }
            const currentPassword = userData.password;

            if (decryptHash(currentPassword) !== data.password) {
                return 'Error: Invalid credentials.'; // Return error message
            }
            setUser(userData);
            const udata = encryptHash(JSON.stringify(userData));
            const token = encryptHash(userData.email);
            setToken(token);
            Cookies.set('isLoggedIn', true, { path: '', secure: true, sameSite: 'strict', expires: 7 });
            Cookies.set('tkn', token, { path: '', secure: true, sameSite: 'strict', expires: 7 });
            Cookies.set('uData', udata, { path: '', secure: true, sameSite: 'strict', expires: 7 });

            toast.success('Login Successfully!');

            return true; // Return true for successful login
        } catch (err) {
            console.error(err);
            return 'Error: An unexpected error occurred.'; // Return a generic error message
        }
    };

    const logOut = () => {
        setUser (null);
        setToken("");
    };

    return (
        <AuthContext.Provider value={{ token, user, registerAction, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};