import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.SECRET_KEY || 'your-default-secret-key'; // Secure key management

export const encryptPassword = (password) => {
    return CryptoJS.AES.encrypt(password, secretKey).toString();
};

export const decryptPassword = (encryptedPassword) => {
    let bytes = "";
    try {
        const decrypt = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
        bytes = decrypt.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        bytes = e;
    }
    return bytes;
};
