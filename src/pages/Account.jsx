import React from 'react';
import {useUser} from "../context/UserProvider";
import ManageAccount from "../components/ManageAccount";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import SectionTitle from "../components/SectionTitle";

const Account = () => {

    const {userData} = useUser();

    return (
        <>
        <AppHeader backUrl="/dashboard" />
            <SectionTitle title='Manage Account' />
            <ManageAccount userData={userData} />
        <AppFooter />
        </>
    )
}

export default Account;