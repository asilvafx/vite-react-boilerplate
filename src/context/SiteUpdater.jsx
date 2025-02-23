import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DBService from '../data/db.service';
import Cookies from "js-cookie";
import {getGasPrice, getTokenBalance} from "../lib/web3";
import { decryptHash, encryptHash } from "../lib/crypto";
import {loadConfig} from '../lib/site';

const SiteUpdater = () => {
    const location = useLocation(); // Get the current location

    // Set update interval in minutes
    const UPDATE_TIME = 1;

    async function fetchExchangeRate() {
        try {
            let coinFrom = "ethereum";
            let coinTo = "usd";

            const chainNetwork = loadConfig.WEB3_CHAIN_SYMBOL;

            switch (chainNetwork) {
                case "POL":
                    coinFrom = "polygon-ecosystem-token";
                break;
            }

            const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinFrom}&vs_currencies=${coinTo}`);

            if (!response.ok) {
                throw new Error('Failed to fetch exchange rate');
            }

            const data = await response.json();
            return data[coinFrom][coinTo]; // Correctly access the price using coinTo as a key
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
            return null; // Return null if there's an error
        }
    }

    async function updateData(key = "") {
        const masterWalletAddress = process.env.WEB3_MASTER_ADDRESS || "";

        const chainBalance = await getTokenBalance(masterWalletAddress, true);
        const tokenBalance = await getTokenBalance(masterWalletAddress);
        const currentTime = Date.now(); // Get current time in milliseconds

        // Fetch the exchange rate for POL in USD
        const exchangeRate = await fetchExchangeRate();

        // Fetch the latest gas price
        const gasPrice = await getGasPrice();

        const updateData = {
            gasPrice: gasPrice,
            tokenBalance: tokenBalance,
            chainBalance: chainBalance,
            lastUpdated: currentTime,
            exchangeRate: exchangeRate
        };

        try {
            if (key === "") {
                const siteData = await DBService.getAll('site');
                // Check if response data is an object
                if (siteData && typeof siteData === 'object' && !Array.isArray(siteData)) {
                    if (Object.keys(siteData).length === 0) {
                        await DBService.create(updateData, 'site');
                    } else {
                        const siteKey = Object.keys(siteData)[0];
                        const fetchData = await DBService.getItem(siteKey, 'site');

                        // Ensure lastUpdated is a valid timestamp
                        if (fetchData && fetchData.lastUpdated) {
                            if (timeDifference(fetchData.lastUpdated)) {
                                await DBService.update(siteKey, updateData, 'site');
                            }
                        } else {
                            await DBService.create(updateData, 'site');
                        }
                    }
                }
            } else {
                await DBService.update(key, updateData, 'site');
            }

            // Set the cookie with the updated data
            const encryptedData = encryptHash(JSON.stringify(updateData)); // Encrypt the data before setting it in the cookie
            Cookies.set('site', encryptedData, { path: '', secure: true, sameSite: 'strict', expires: 7 });
            return true;
        } catch (error) {
            console.error("Error updating data:", error);
            return false;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {

                const dataCookies = Cookies.get('site');

                if (dataCookies) {
                    const decryptedData = JSON.parse(decryptHash(dataCookies)); // Ensure to parse the decrypted data

                    // Ensure lastUpdated is a valid timestamp
                    if (decryptedData && decryptedData.lastUpdated) {
                        if (timeDifference(decryptedData.lastUpdated)) {
                            await updateData(decryptedData.siteKey); // Update data if older than 5 minutes
                        }
                    } else {
                        await updateData(); // Update if lastUpdated is invalid
                    }
                } else {
                    await updateData(); // Update if no data
                }

            } catch (err) {
                console.error("Error fetching site data:", err);
            }
        };

        fetchData(); // Call fetchData whenever the component mounts or location changes
    }, [location]); // Add location as a dependency

    function timeDifference(timestamp) {
        const currentTime = Date.now(); // Get current time in milliseconds
        const totalDifference = currentTime - timestamp;

        // Check if the difference is greater than x minutes (x * 60 * 1000 milliseconds)
        return totalDifference > (UPDATE_TIME * 60 * 1000);
    }

    return null; // This component does not render anything
};

export default SiteUpdater;