import React from 'react';
import { Navbar, DarkThemeToggle } from "flowbite-react";
import {Link} from "react-router-dom";
import { useUser } from '../context/UserProvider';
import logo_img from '../assets/ned_full.svg';

const Header = () => {

    const { userData } = useUser();

    return (
        <>
            <Navbar className="top-nav h-14 fixed w-full p-0" fluid>
                <Navbar.Brand href="/" className="flex items-center gap-4">
                    <img className="mr-3 h-12 w-auto filter invert" src={logo_img} width={100} height={100} alt="Logo" />
                </Navbar.Brand>

                <div className="flex items-center gap-2 md:order-2">
                    <DarkThemeToggle className="!bg-transparent border-0 focus:ring-0 m-0" />

                    {/* Conditionally render the Connect button or user email */}
                    {!userData  ? (
                        <Link to="/login">
                        <button className="cyber-button flex items-center backdrop-blur-lg">
                            Connect
                        </button>
                        </Link>
                    ) : (
                        <Link to="/dashboard">
                            <button className="cyber-button flex items-center backdrop-blur-lg">
                                Dashboard
                            </button>
                        </Link>
                    )}

                </div>
            </Navbar>

            <div className="h-14 w-full"></div>
        </>
    );
}

export default Header;