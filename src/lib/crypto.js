import CryptoJS from 'crypto-js';

const secretKey = process.env.SECRET_KEY || 'your-default-secret-key'; // Secure key management

const CryptoJSAesJson = {
    stringify: function (cipherParams) {
        const j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
        if (cipherParams.iv) j.iv = cipherParams.iv.toString();
        if (cipherParams.salt) j.s = cipherParams.salt.toString();
        return JSON.stringify(j);
    },
    parse: function (jsonStr) {
        const j = JSON.parse(jsonStr);
        const cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(j.ct)
        });
        if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
        if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
        return cipherParams;
    }
};

export const encryptHash = (password) => {
    return CryptoJS.AES.encrypt(JSON.stringify(password), secretKey, {
        format: CryptoJSAesJson
    }).toString();
};

export const decryptHash = (encryptedPassword) => {
    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedPassword, secretKey, {
            format: CryptoJSAesJson
        }).toString(CryptoJS.enc.Utf8);

        if (!decrypted) {
            throw new Error('Decryption failed');
        }

        return JSON.parse(decrypted);
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
};