import React, {useState} from 'react';
import { DarkThemeToggle } from "flowbite-react";
import { IoMenu } from "react-icons/io5";
import ModalCreate from "./ModalCreate.jsx";
const Header = () => {

    const [isModalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <header>
            <nav className="fixed w-full top-0 bg-secondary border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl h-10">
                    <a href="https://flowbite.com" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9"
                             alt="Flowbite Logo"/>
                        <span
                            className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">React App</span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <DarkThemeToggle className="btn text-alt hover:bg-alt focus:ring-0"/>

                        <button onClick={handleOpenModal}
                                className="p-2 rounded-lg ml-2">
                            Open Modal
                        </button> 

                        <button data-collapse-toggle="mobile-menu" type="button"
                                className="inline-flex lg:hidden items-center p-2 ml-2 rounded-lg"
                                aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <IoMenu className="text-2xl"/>
                        </button>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                         id="mobile-menu">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                            <a href="#"
                                   className="block py-2 pr-4 pl-3 text-color rounded lg:p-0"
                                   aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block py-2 pr-4 pl-3 text-gray-700 dark:text-gray-400 rounded lg:p-0">Company</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block py-2 pr-4 pl-3 text-gray-700 dark:text-gray-400 rounded lg:p-0">Marketplace</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block py-2 pr-4 pl-3 text-gray-700 dark:text-gray-400 rounded lg:p-0">Features</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block py-2 pr-4 pl-3 text-gray-700 dark:text-gray-400 rounded lg:p-0">Team</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block py-2 pr-4 pl-3 text-gray-700 dark:text-gray-400 rounded lg:p-0">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="min-h-40 w-full"></div>

            <ModalCreate show={isModalVisible} onClose={handleCloseModal} />

        </header>
    );
}

export default Header;
