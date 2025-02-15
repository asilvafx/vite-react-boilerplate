import React, { useEffect, useState } from 'react';
import { Button, Navbar, DarkThemeToggle, Dropdown } from "flowbite-react";
import {Link} from "react-router-dom";
import ModalConnect from "./ModalConnect";
import { checkLoginStatus, getUserData } from '../lib/user';
import { shortenAddress } from '../lib/utils';


const Header = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentUser , setCurrentUser ] = useState(null);

    useEffect(() => {
        const isLoggedIn = checkLoginStatus();
        if (isLoggedIn) {
            const userData = getUserData();
            setCurrentUser(userData);
        } else {
            setCurrentUser(null);
        }
    }, []);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <Navbar className="top-nav h-14 fixed w-full p-0" fluid>
                <Navbar.Brand href="/">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-8" alt="Flowbite Logo" />
                </Navbar.Brand>
                <div className="flex items-center gap-2 md:order-2">
                    <DarkThemeToggle className="!bg-transparent border-0 focus:ring-0 m-0" />

                    {/* Conditionally render the Connect button or user email */}
                    {!currentUser  ? (
                        <Button size="sm" onClick={handleOpenModal} className="rounded-md m-0 ml-2 border-neutral-300 dark:border-neutral-700 !bg-neutral-200 dark:!bg-neutral-800 text-black dark:text-white font-bold">
                            Connect
                        </Button>
                    ) : (
                        <Dropdown
                            label=""
                            dismissOnClick={false}
                            renderTrigger={() =>
                                <Button className="rounded-md m-0 ml-2 border-neutral-700 !bg-neutral-950 dark:!bg-neutral-800 text-white font-bold">
                                    {shortenAddress(currentUser.web3_address)}
                                </Button>
                            }
                            >
                            <Dropdown.Item><Link to="/dashboard">Dashboard</Link></Dropdown.Item>
                            <Dropdown.Item><Link to="/logout">Sign out</Link></Dropdown.Item>
                        </Dropdown>
                    )}

                </div>
            </Navbar>
            <ModalConnect show={isModalVisible} onClose={handleCloseModal} />


            <div className="h-14 w-full"></div>
        </>
    );
}

export default Header;