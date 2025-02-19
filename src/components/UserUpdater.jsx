// src/components/UserUpdater.jsx
import React, { useEffect } from 'react';
import { getUserData, updateData } from '../lib/user';
import { useUser  } from '../context/UserProvider';
import Cookies from "js-cookie";

const UserUpdater = () => {
    const { setUserData } = useUser ();

    useEffect(() => {
        const isLoggedIn = Cookies.get('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            return; // Exit if not logged in
        }

        const fetchUserData = async () => {
            const fetchNewData = await getUserData();
            if (!fetchNewData) {
                return;
            }

            const newData = await updateData(fetchNewData);
            setUserData(newData); // Update user data in context
        };

        // Initial fetch
        fetchUserData();

        // Set up interval to update data every 30 seconds
        const intervalId = setInterval(async () => {
            await fetchUserData();
        }, 30000); // 30 seconds

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, [setUserData]); // Add setUser Data to the dependency array

    return null; // This component does not render anything
};

export default UserUpdater;