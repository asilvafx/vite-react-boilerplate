import Cookies from "js-cookie";
import {decryptHash} from "./crypto.js";

export const loadConfig = {
    WEB3_CHAIN_NAME: "Polygon PoS",
    WEB3_CHAIN_SYMBOL: "POL",
    WEB3_CONTRACT_NAME: "BOLT",
    WEB3_CONTRACT_SYMBOL: "BOLT",
    WEB3_CONTRACT_SUPPLY: "10000000000000",
    WEB3_CONTRACT_TYPE: "ERC-20",
    WEB3_CONTRACT_BASE_PRICE: "0.10",
    WEB3_CONTRACT_ADDRESS: "0xcAe70C1E0d33484D157F13CF04C554512ED225f6",
};

export const loadEnv = {
    WEB3_MASTER_ADDRESS: process.env.WEB3_MASTER_ADDRESS,
    WEB3_MASTER_PK: process.env.WEB3_MASTER_PK

};

export const getSiteData = () => {
    const sData = Cookies.get('site');

    return JSON.parse(decryptHash(sData));
}