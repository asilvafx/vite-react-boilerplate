
import Cookies from 'js-cookie';
import { decryptHash } from './crypto.js';

export const getUserData = () => {

    try {
        const loggedIn = Cookies.get('isLoggedIn') === 'true';
        const uData = Cookies.get('uData');

        if(loggedIn){
            return JSON.parse(decryptHash(uData));
        } else {
            return;
        }

    } catch (err) {
        console.error(err);
    }
}
export const checkLoginStatus = () => {
    const loggedIn = Cookies.get('isLoggedIn') === 'true';
    const uData = Cookies.get('uData');
    const tkn = Cookies.get('tkn');

    if (loggedIn && uData && tkn) {
        try {
            const decryptedUData = JSON.parse(decryptHash(uData));
            const decryptedTkn = decryptHash(tkn);

            // Check if the token matches the email in uData
            return decryptedTkn === decryptedUData.email; // Valid login
        } catch (error) {
            console.error("Error checking login status:", error);
            return false; // In case of error, return false
        }
    }
    return false; // Invalid login
};