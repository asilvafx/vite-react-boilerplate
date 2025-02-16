import React, { useEffect, useState } from 'react';
import { Button, Navbar, DarkThemeToggle, Dropdown } from "flowbite-react";
import { Plus, Box, Wallet, Home } from 'lucide-react';
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
                    {/* <DarkThemeToggle className="!bg-transparent border-0 focus:ring-0 m-0" />  */}

                    {/* Conditionally render the Connect button or user email */}
                    {!currentUser  ? (
                        <Button size="sm" onClick={handleOpenModal} className="rounded-md m-0 ml-2 border-neutral-700 !bg-neutral-800 text-white font-bold">
                            Connect
                        </Button>
                    ) : (
                        <>
                        <div className="hidden md:flex gap-2 items-center">
                        <Link to="/dashboard">
                            <button className="cyber-button flex items-center bg-neutral-950 bg-opacity-95">
                                <Home size="20" />
                            </button>
                        </Link>
                        <Link to="/create">
                        <button className="cyber-button flex items-center bg-neutral-950 bg-opacity-95">
                            <Plus size="20" />
                        </button>
                        </Link>
                        <Link to="/join">
                        <button className="cyber-button flex items-center bg-neutral-950 bg-opacity-95">
                            <Box size="20" />
                        </button>
                        </Link>
                        </div>
                        <Dropdown
                            label=""
                            dismissOnClick={false}
                            renderTrigger={() => (
                                <button className="cyber-button flex items-center bg-neutral-950 bg-opacity-95">
                                    <Wallet size="20" className="me-2" />
                                    {shortenAddress(currentUser.web3_address)}
                                </button>
                                )
                            }
                            >
                            <Link to="/account"><Dropdown.Item className="!bg-neutral-900 flex flex-col items-start rounded-sm w-[95%] mx-auto">
                                <span>10000 $BOLT </span>
                                <span className="text-xs uppercase text-blue-500 font-semibold">Top-up</span>
                            </Dropdown.Item></Link>
                            <Link to="/logout"><Dropdown.Item>
                                Sign out
                            </Dropdown.Item></Link>
                        </Dropdown>
                        </>
                    )}

                </div>
            </Navbar>
            <ModalConnect show={isModalVisible} onClose={handleCloseModal} />


            <div className="h-14 w-full"></div>
        </>
    );
}

export default Header;