
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
        const decryptedUData = JSON.parse(decryptHash(uData));
        const decryptedTkn = decryptHash(tkn);

        // Check if the token matches the email in uData
        if (decryptedTkn === decryptedUData.email) {
            return true; // Valid login
        }
    }
    return false; // Invalid login
};