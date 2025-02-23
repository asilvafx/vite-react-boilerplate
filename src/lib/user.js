// src/lib/user.js
import Cookies from 'js-cookie';
import { encryptHash, decryptHash } from './crypto.js';
import DBService from "../data/db.service.js";
import { getTokenBalance } from "./web3.js"; 
export const getUserData = () => {
    const loggedIn = Cookies.get('isLoggedIn') === 'true';
    const uData = Cookies.get('uData');

    if (loggedIn) {
        return JSON.parse(decryptHash(uData));
    }
}

export const checkLoginStatus = async () => {
    const loggedIn = Cookies.get('isLoggedIn') === 'true';
    const uData = Cookies.get('uData');
    const tkn = Cookies.get('tkn');

    if (loggedIn && uData && tkn) {
        try {
            const decryptedUData = JSON.parse(decryptHash(uData));
            const decryptedTkn = decryptHash(tkn);

            const userCheck = await DBService.getItemByKeyValue('email', decryptedUData.email, 'users');

            if (!userCheck) {
                return false;
            }

            // Check if the token matches the email in uData
            return decryptedTkn === decryptedUData.email;

        } catch (error) {
            console.error("Error checking login status:", error);
            return false; // In case of error, return false
        }
    }
    return false; // Invalid login
};

export const updateData = async (userData) => {
    // Fetch the current token balances
    if(!userData){
        userData = await getUserData();
    }

    const fetchTokenBalance = await getTokenBalance(userData.web3_address);
    const fetchChainBalance = await getTokenBalance(userData.web3_address, true);

    // Prepare the updated data
    const userActualData = await DBService.getItemByKeyValue('email', userData.email, 'users');
    const userKey = await DBService.getItemKey('email', userData.email, 'users');

    const data = {
        ...userActualData,
        web3_custom_token_balance: fetchTokenBalance,
        web3_network_token_balance: fetchChainBalance,
    };

    await DBService.update(userKey, data, 'users');

    // Encrypt the updated user data and update the cookie
    const encryptedData = encryptHash(JSON.stringify(data));

    Cookies.set('uData', encryptedData, { path: '', secure: true, sameSite: 'strict' });

    return data;
}