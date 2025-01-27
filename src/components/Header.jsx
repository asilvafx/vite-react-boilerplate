import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { DarkThemeToggle } from "flowbite-react";
import { Navbar } from "flowbite-react";
import ModalCreate from "./ModalCreate";

const Header = () => {

    const [isModalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <>
        <Navbar className="top-nav fixed w-full" fluid rounded>
            <Navbar.Brand href="/">
                <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9"
                     alt="Flowbite Logo"/>
                <span
                    className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">React App</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <DarkThemeToggle className="btn text-alt hover:bg-alt focus:ring-0 m-0"/>

                <button onClick={handleOpenModal}
                        className="p-2 rounded-lg ml-2">
                    Open Modal
                </button>
                <Navbar.Toggle/>
            </div>
            <Navbar.Collapse>
                <Link to="/" active="true">Home</Link>
                <Link to="/sample">Sample</Link>
            </Navbar.Collapse>
        </Navbar>
        <div className="h-24 w-full"></div>
        <ModalCreate show={isModalVisible} onClose={handleCloseModal} />

        </>
    );
}

export default Header;
