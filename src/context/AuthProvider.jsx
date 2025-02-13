import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import DBService from '../data/db.service';
import {encryptPassword, decryptPassword} from "../lib/crypto.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
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

            if(decryptPassword(currentPassword) !== data.password){
                console.log('Error: Invalid credentials.');
                return;
            }
            // Redirect or perform any action after successful login
            alert('Login Successfully! You will be now redirected..');

            setUser(userData.email);
            const udata = encryptPassword(JSON.stringify(userData));
            const token = encryptPassword(userData.email);
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
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};