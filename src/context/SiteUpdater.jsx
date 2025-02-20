import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DBService from '../data/db.service';
import { getTokenBalance } from "../lib/web3.js";

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
            if(key === ""){
                await DBService.create(updateData, 'site');
            } else {
                await DBService.update(key, updateData, 'site');
            }

            console.log("Site data updated successfully.");
            return true;
        } catch (error) {
            console.error("Error updating data:", error);
            return false;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const siteData = await DBService.getAll('site');
                let hasData = false;

                // Check if response data is an object
                if (siteData && typeof siteData === 'object' && !Array.isArray(siteData)) {
                    if (Object.keys(siteData).length > 0) {
                        hasData = true;
                    }
                } else {
                    await updateData(); // Update if no data
                    return;
                }

                if (hasData) {
                    const siteKey = Object.keys(siteData)[0];
                    const fetchData = await DBService.getItem(siteKey, 'site');

                    // Ensure lastUpdated is a valid timestamp
                    if (fetchData && fetchData.lastUpdated) {
                        const currentTime = Date.now(); // Get current time in milliseconds
                        const timeDifference = currentTime - fetchData.lastUpdated;

                        // Check if the difference is greater than 5 minutes (5 * 60 * 1000 milliseconds)
                        const isOlderThan5Minutes = timeDifference > (5 * 60 * 1000);

                        if (isOlderThan5Minutes) {
                            await updateData(siteKey); // Update data if older than 5 minutes
                        }  
                    } else {
                        await updateData(siteKey); // Update if lastUpdated is invalid
                    }
                }

            } catch (err) {
                console.error("Error fetching site data:", err);
            }
        };

        fetchData(); // Call fetchData whenever the component mounts or location changes
    }, [location]); // Add location as a dependency

    return null; // This component does not render anything
};

export default SiteUpdater;