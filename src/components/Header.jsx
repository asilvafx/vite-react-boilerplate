import React, { useEffect, useState } from 'react';
import { Navbar, DarkThemeToggle, Dropdown } from "flowbite-react";
import { Plus, Box, Wallet, Home, LogOut } from 'lucide-react';
import {Link} from "react-router-dom";
import { checkLoginStatus, getUserData } from '../lib/user';
import { shortenAddress } from '../lib/utils';


const Header = () => {
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
                        <Link to="/login">
                        <button size="sm"  className="cyber-button flex items-center backdrop-blur-lg">
                            Connect
                        </button>
                        </Link>
                    ) : (
                        <>
                        <div className="hidden md:flex gap-2 items-center">
                        <Link to="/dashboard">
                            <button className="cyber-button flex items-center backdrop-blur-lg">
                                <Home size="20" />
                            </button>
                        </Link>
                        <Link to="/create">
                        <button className="cyber-button flex items-center backdrop-blur-lg">
                            <Plus size="20" />
                        </button>
                        </Link>
                        <Link to="/chests">
                        <button className="cyber-button flex items-center backdrop-blur-lg">
                            <Box size="20" />
                        </button>
                        </Link>
                        </div>
                        <Dropdown
                            className="premium-panel"
                            label=""
                            dismissOnClick={false}
                            renderTrigger={() => (
                                <button className="cyber-button flex items-center backdrop-blur-lg">
                                    <Wallet size="20" className="me-2" />
                                    {shortenAddress(currentUser.web3_address)}
                                </button>
                                )
                            }
                            >
                            <Link to="/account"><Dropdown.Item className="premium-panel flex flex-col items-start rounded-sm w-[95%] mx-auto">
                                <span>10000 $BOLT </span>
                                <span className="text-xs uppercase text-blue-500 font-semibold">Top-up</span>
                            </Dropdown.Item></Link>
                            <Link to="/logout"><Dropdown.Item className="text-neutral-100 flex items-center gap-2">
                            <LogOut size="16" /> Sign out
                            </Dropdown.Item></Link>
                        </Dropdown>
                        </>
                    )}

                </div>
            </Navbar>

            <div className="h-14 w-full"></div>
        </>
    );
}

export default Header;