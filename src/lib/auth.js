
import Cookies from 'js-cookie';
import { decryptPassword } from './crypto.js'; 

export const checkLoginStatus = () => {
    const loggedIn = Cookies.get('isLoggedIn') === 'true';
    const uData = Cookies.get('uData');
    const tkn = Cookies.get('tkn');

    if (loggedIn && uData && tkn) {
        const decryptedUData = JSON.parse(decryptPassword(uData));
        const decryptedTkn = decryptPassword(tkn);

        // Check if the token matches the email in uData
        if (decryptedTkn === decryptedUData.email) {
            return true; // Valid login
        }
    }
    return false; // Invalid login
};