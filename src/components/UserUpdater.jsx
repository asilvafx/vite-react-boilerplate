import React, { useEffect } from 'react';
import {getUserData, updateData} from '../lib/user';
import { useUser } from '../context/UserProvider';
import Cookies from "js-cookie";

const UserUpdater = () => {

    const isLoggedIn = Cookies.get('isLoggedIn');
    if(!isLoggedIn){
       return;
    }

    const { userData, setUserData } = useUser();

    async function fetchUserData() {
        const fetchNewData = await getUserData();
        if (!fetchNewData) {
            return;
        }

        const newData = await updateData(fetchNewData);

        setUserData(newData);
    }

    useEffect(() => {

        const fetchData = async () => {
            if(!userData){
                await fetchUserData();
            }
        }
        fetchData();

        const intervalId = setInterval(async () => {

            await fetchUserData();

        }, 30000); // 30 seconds

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, [setUserData]);

    return null; // This component does not render anything
};

export default UserUpdater;