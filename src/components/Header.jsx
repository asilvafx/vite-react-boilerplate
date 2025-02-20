import React, {useState} from 'react';
import { Navbar, DarkThemeToggle, Dropdown } from "flowbite-react";
import {LogOut, QrCode} from 'lucide-react';
import {Link} from "react-router-dom";
import { shortenAddress } from '../lib/utils';
import { useUser } from '../context/UserProvider';
import QRModal from '../components/QRModal';

const Header = () => {

    const { userData } = useUser();

    const [isQRModalOpen, setIsQRModalOpen] = useState(false);

    return (
        <>
            <Navbar className="top-nav h-14 fixed w-full p-0" fluid>
                <Navbar.Brand href="/" className="flex items-center gap-4">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-8" alt="Flowbite Logo" />
                </Navbar.Brand>

                <div className="flex items-center gap-2 md:order-2">
                    {/* <DarkThemeToggle className="!bg-transparent border-0 focus:ring-0 m-0" />  */}

                    {/* Conditionally render the Connect button or user email */}
                    {!userData  ? (
                        <Link to="/login">
                        <button className="cyber-button flex items-center backdrop-blur-lg">
                            Connect
                        </button>
                        </Link>
                    ) : (
                        <>
                            <Dropdown
                                className="premium-panel"
                                label=""
                                dismissOnClick={false}
                                renderTrigger={() => (
                                    <button className="cyber-button flex items-center backdrop-blur-lg">
                                        {parseFloat(userData?.web3_custom_token_balance).toFixed(3)} $BOLT
                                    </button>
                                )
                                }
                            >
                                <Link to="/dashboard"><Dropdown.Item
                                    className="premium-panel flex flex-col items-start rounded-sm w-[95%] mx-auto">

                                    <span>{shortenAddress(userData.web3_address)}</span>
                                    <span className="text-xs uppercase text-blue-500 font-semibold">Manage</span>
                                </Dropdown.Item></Link>
                                <Link to="/logout"><Dropdown.Item className="text-neutral-100 flex items-center gap-2">
                                    <LogOut size="16"/> Sign out
                                </Dropdown.Item></Link>
                            </Dropdown>
                            <button
                                onClick={() => setIsQRModalOpen(true)}
                                className="cyber-button !px-4 flex items-center backdrop-blur-lg premium-icon-glow"
                            >
                                <QrCode className="w-5 h-5"/>
                            </button>
                        </>
                    )}

                </div>
            </Navbar>

            <div className="h-14 w-full"></div>

            {/* QR Modal */}
            <QRModal
                isOpen={isQRModalOpen}
                onClose={() => setIsQRModalOpen(false)}
                walletAddress={userData?.web3_address}
            />
        </>
    );
}

export default Header;