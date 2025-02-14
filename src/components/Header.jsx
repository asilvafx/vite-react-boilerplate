import React, { useEffect, useState } from 'react';
import { Button, Navbar, DarkThemeToggle } from "flowbite-react";
import ModalConnect from "./ModalConnect";
import { useCart } from 'react-use-cart';
import Cart from './Cart';
import { useAuth } from '../context/authprovider'; // Import the useAuth hook
import { checkLoginStatus, getUserData } from '../lib/user';

const Header = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isCartVisible, setCartVisible] = useState(false);
    const { totalItems } = useCart();
    const { user, logOut } = useAuth(); // Get user and logOut from context
    const [currentUser , setCurrentUser ] = useState(null);

    useEffect(() => {
        const isLoggedIn = checkLoginStatus();
        if (isLoggedIn) {
            const userData = getUserData();
            setCurrentUser (userData);
        } else {
            setCurrentUser (null);
        }
    }, []);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleOpenCart = () => {
        setCartVisible(true);
    };

    const handleCloseCart = () => {
        setCartVisible(false);
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
                        <span className="text-black dark:text-white font-bold">{currentUser .email}</span>
                    )}

                    {/* Shopping Cart Button */}
                    <Button size="sm" onClick={handleOpenCart} className="relative rounded-md m-0 ml-2 border-neutral-300 dark:border-neutral-700 !bg-neutral-200 dark:!bg-neutral-800 text-black dark:text-white font-bold">
                        Cart
                        <span className="absolute top-[-5px] right-[-5px] inline-flex items-center justify-center w-4 h-4 text-xs font-medium text-white bg-red-600 rounded-full">
                            {totalItems > 0 ? totalItems : 0}
                        </span>
                    </Button>
                </div>
            </Navbar>
            <ModalConnect show={isModalVisible} onClose={handleCloseModal} />

            {/* Off-Canvas Cart */}
            {isCartVisible && (
                <div className="offcanvas-container bg-white dark:bg-neutral-900 shadow-lg border-l border-gray-300 dark:border-gray-700">
                    <Cart onClose={handleCloseCart} />
                </div>
            )}

            <div className="h-14 w-full"></div>
        </>
    );
}

export default Header;