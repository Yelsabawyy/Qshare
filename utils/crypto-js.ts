import CryptoJS from "crypto-js";

const secretKey = 'BV*czjMVDcPn6jI$';


//encrypt
export function encrypt(text: string): string {
    
    if (!secretKey) {
        throw new Error("Secret key is not defined");
    }
    return CryptoJS.AES.encrypt(text, secretKey).toString()
}

//decrypt
export function decrypt(ciphertext: string): string {
    if (!secretKey) {
        throw new Error("Secret key is not defined");
    }
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}
