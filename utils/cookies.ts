import Cookies from "js-cookie";
import { decrypt, encrypt } from "./crypto-js";

export const setCookie = (name: string, value: string, days?: number): void => {
  const encryptedValue = encrypt(value);
  Cookies.set(name, encryptedValue, {
    expires: days || 14,
    secure: true,
    sameSite: "Strict",
  });
};

export const getCookie = (name: string): string | undefined => {
  return decrypt(Cookies.get(name)??'');
};


export const removeCookie = (name: string): void => {
  Cookies.remove(name);
};
