import { useContext, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import DBService from '../data/db.service';
import {encryptHash, decryptHash} from "../lib/crypto.js";
import Web3 from 'web3';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();

    const [web3, setWeb3] = useState(null);
    const tokenProvider = process.env.WEB3_INFURA_RPC || "";
    useEffect(() => {
        if (tokenProvider) {
            try {
                const newWeb3 = new Web3(new Web3.providers.HttpProvider(tokenProvider));
                setWeb3(newWeb3);
            } catch (error) {
                console.error("Failed to initialize Web3:", error);
            }
        }
    }, [tokenProvider]);

    const registerAction = async (data) => {
        try {
            const userCheck = await DBService.getItemByKeyValue('email', data.username, 'users');

            if(userCheck){
                alert('Email address already exists in our system!');
                return false;
            }

            if (!web3 && !tokenProvider) {
                alert('Please ensure you have a valid RPC provider, and try again.');
                return false;
            }
            const web3_account = web3.eth.accounts.create();

            const userData = {
                email: data.username,
                password: encryptHash(data.password),
                fullName: data.fullName,
                web3_address: web3_account.address,
                web3_pk: encryptHash(web3_account.privateKey),
            };

            try {
                await DBService.create(userData, 'users');
                alert("Registration successful!");
                return true;
            } catch (error) {
                console.error("Error creating user:", error);
                alert("Registration failed. Please try again.");
                return false;
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    };
    const loginAction = async (data) => {
        try {
            // Sign in the user
            // Fetch user data from the database using DBService
            const userData = await DBService.getItemByKeyValue('email', data.username, 'users');

            if(!userData){
                console.log('Error: Invalid credentials.');
                return;
            }
            const currentPassword = userData.password;

            if(decryptHash(currentPassword) !== data.password){
                console.log('Error: Invalid credentials.');
                return;
            }
            // Redirect or perform any action after successful login
            alert('Login Successfully! You will be now redirected..');

            setUser(userData.email);
            const udata = encryptHash(JSON.stringify(userData));
            const token = encryptHash(userData.email);
            setUser(userData.email);
            setToken(token);
            Cookies.set('isLoggedIn', true, { path: '', secure: true, sameSite: 'strict' });
            Cookies.set('tkn', token, { path: '', secure: true, sameSite: 'strict' });
            Cookies.set('uData', udata, { path: '', secure: true, sameSite: 'strict' });

            window.location.reload();
            return;

            throw new Error(res.message);
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/login");
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