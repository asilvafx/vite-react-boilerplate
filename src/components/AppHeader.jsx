import React, {useEffect, useState} from 'react';
import { Navbar, DarkThemeToggle, Dropdown } from "flowbite-react";
import {LogOut, QrCode} from 'lucide-react';
import {Link} from "react-router-dom";
import {loadConfig} from '../lib/site';
import { shortenAddress } from '../lib/utils';
import { useUser } from '../context/UserProvider';
import QRModal from '../components/QRModal';
import GoBack from '../components/GoBack';
import logo_badge from '../assets/ned_icon.svg';

const Header = ({backUrl}) => {

    const [url, setUrl] = useState(null);

    const { userData } = useUser();

    const [isQRModalOpen, setIsQRModalOpen] = useState(false);

    useEffect(() => {
        if(backUrl){
            setUrl(backUrl);
        }
    },[backUrl])

    return (
        <>
            <Navbar className="top-nav h-14 fixed w-full p-0" fluid>

                    {!url ? (
                        <Navbar.Brand href="/" className="cyber-button">
                            <img className="h-5 w-auto filter invert" src={logo_badge} width={100}
                                 height={100} alt="Logo"/>
                        </Navbar.Brand>
                    ) : (
                        <GoBack url={url}/>
                    )}


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
                        <>
                            <Dropdown
                                className="premium-panel"
                                label=""
                                dismissOnClick={false}
                                renderTrigger={() => (
                                    <button className="cyber-button flex items-center backdrop-blur-lg">
                                        <span>
                                            {parseFloat(userData?.web3_available_balance).toFixed(3)}
                                            {' '}
                                            ${loadConfig.WEB3_CONTRACT_SYMBOL}
                                        </span>
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
                                className="cyber-button !px-4 flex items-center backdrop-blur-lg"
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