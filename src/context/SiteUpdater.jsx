import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import DBService from '../data/db.service';
import {getTokenBalance} from "../lib/web3";
import Cookies from "js-cookie";
import {decryptHash, encryptHash} from "../lib/crypto";

const SiteUpdater = () => {
    const location = useLocation(); // Get the current location

    async function updateData(key = "") {
        const masterWalletAddress = process.env.WEB3_MASTER_ADDRESS || "";

        const chainBalance = await getTokenBalance(masterWalletAddress, true);
        const tokenBalance = await getTokenBalance(masterWalletAddress);
        const currentTime = Date.now(); // Get current time in milliseconds

        const updateData = {
            tokenBalance: tokenBalance,
            chainBalance: chainBalance,
            lastUpdated: currentTime
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
                            if(timeDifference(fetchData.lastUpdated)){
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
                        if(timeDifference(decryptedData.lastUpdated)){
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

        // Check if the difference is greater than 5 minutes (5 * 60 * 1000 milliseconds)
        return totalDifference > (5 * 60 * 1000);
    }

    return null; // This component does not render anything
};

export default SiteUpdater;