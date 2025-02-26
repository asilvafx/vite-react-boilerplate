import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats, Html5QrcodeScanType } from 'html5-qrcode';
import { X, Copy } from 'lucide-react';
import { shortenAddress } from "../lib/utils";
import copyToClipboard from './CopyToClipboard';
import DBService from '../data/db.service';
import {toast} from 'react-hot-toast';
import {updateData} from '../lib/user';
import {useUser} from '../context/UserProvider';

const QRModal = ({ isOpen, onClose, walletAddress }) => {
    const {userData} = useUser();
    const [activeTab, setActiveTab] = useState('code');
    const [scannedResult, setScannedResult] = useState(null);
    const [scanner, setScanner] = useState(null);
    const [contactAdded, setContactAdded] = useState(false); // State to track if contact is added
    const navigate = useNavigate(); // Use navigate for programmatic navigation

    useEffect(() => {
        if (isOpen && activeTab === 'scan') {

            const formatsToSupport = [
                Html5QrcodeSupportedFormats.QR_CODE,
            ];
            const newScanner = new Html5QrcodeScanner(
                "qr-reader",
                {
                    fps: 10,
                    qrbox: { width: 200, height: 200 },
                    rememberLastUsedCamera: true,
                    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
                    formatsToSupport: formatsToSupport
                },
                false
            );

            setScanner(newScanner);

            newScanner.render(
                (decodedText) => {
                    if (!decodedText.startsWith('0x') || decodedText.length !== 42) {
                        return;
                    }
                    setScannedResult(decodedText);
                    newScanner.pause();
                },
                (error) => {
                   return;
                }
            );

            return () => {
                if (newScanner) {
                    try {
                        newScanner.clear();
                    } catch (error) {
                        console.error('Error clearing scanner:', error);
                    }
                }
            };
        }

        return () => {
            if (scanner) {
                try {
                    scanner.clear();
                } catch (error) {
                    console.error('Error clearing scanner:', error);
                }
            }
        };
    }, [isOpen, activeTab]);

    const handleClose = () => {
        if (scanner) {
            try {
                scanner.clear();
            } catch (error) {
                console.error('Error clearing scanner:', error);
            }
        }
        setScannedResult(null);
        setActiveTab('code');
        onClose();
    };

    const handleTabChange = (tab) => {
        if (scanner) {
            try {
                scanner.clear();
            } catch (error) {
                console.error('Error clearing scanner:', error);
            }
        }
        setScannedResult(null);
        setActiveTab(tab);
    };

    const handleAddContact = async () => {
        if (scannedResult) {
            // Check if the scanned address is valid
            if (!scannedResult.startsWith('0x') || scannedResult.length !== 42) {
                toast.error('Please enter a valid wallet address');
                return;
            }

            // Check if the contact already exists
            const exists = userData.contacts.some(contact =>
                contact.address.toLowerCase() === scannedResult.toLowerCase()
            );

            if (exists) {
                toast.error('This contact already exists');
                return;
            }

            // Create a new contact object
            const newContact = {
                id: Date.now().toString(),
                name: `${shortenAddress(scannedResult)}`,
                address: scannedResult
            };

            // Update the local contacts state
            const updatedContacts = [...userData.contacts, newContact];

            // Update the user data in the context
            await DBService.update(userData.uid, { contacts: updatedContacts }, 'users'); // Update the user's contacts in the database

            // Optionally, you can call updateData() if you want to refresh the user data
            await updateData();

            // Show success message
            toast.success('Contact added successfully');
            setContactAdded(true); // Set the state to indicate the contact was added
        }
    };

    const handleSendCrypto = () => {
        if (scannedResult) {
            onClose(); // Close the modal
            navigate(`/send/${btoa(scannedResult)}`); // Navigate to the send page with the encoded address
        }
    };

    const handleScanAgain = () => {
        setScannedResult(null); // Clear the scanned result 
        scanner.resume();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="premium-panel p-6 rounded-xl w-[360px] mx-4 relative" style={{ maxHeight: 'calc(100vh - 2rem)' }}>
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                    <X className="w-4 h-4 text-gray-400" />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-xl font-medium neon-text">QR Code Scanner</h2>
                    <p className="text-sm text-gray-400 mt-1">Scan or share your wallet address</p>
                </div>

                <div className="flex space-x-2 mb-6">
                    <button
                        onClick={() => handleTabChange('code')}
                        className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                            activeTab === 'code'
                                ? 'bg-cyan-500/20 text-cyan-400'
                                : 'text-gray-400 hover:text-gray-300'
                        }`}
                    >
                        My Code
                    </button>
                    <button
                        onClick={() => handleTabChange('scan')}
                        className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                            activeTab === 'scan'
                                ? 'bg-cyan-500/20 text-cyan-400'
                                : 'text-gray-400 hover:text-gray-300'
                        }`}
                    >
                        Scan
                    </button>
                </div>

                <div className="flex flex-col items-center overflow-hidden">
                    {activeTab === 'code' ? (
                        <div className="premium-panel p-4 rounded-xl ">
                            <QRCodeSVG
                                value={walletAddress}
                                size={250}
                                level="H"
                                className="filter invert premium-border rounded-xl"

                            />
                            <div className="w-full premium-bg premium-border rounded-lg flex items-center justify-between mt-4 p-2 gap-2">
                                <p>{shortenAddress(walletAddress)}</p>
                                <button
                                    onClick={() => copyToClipboard(walletAddress, 'Wallet address copied to clipboard')}
                                    className="text-cyan-400 hover:text-cyan-300 p-1 transition-colors"
                                >
                                    <Copy className="w-4 h-4"/>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full">
                            <div id="qr-reader" className={`premium-panel rounded-xl overflow-hidden ${scannedResult && 'hidden'}`}/>
                            {scannedResult && (
                                <div className="mt-4 p-4 premium-panel rounded-lg">
                                    <p className="text-sm text-gray-400">Address Found:</p>
                                    <p className="font-mono text-sm text-cyan-400 break-all">{scannedResult}</p>
                                    <div className="grid grid-cols-1 gap-4 mt-4">
                                        <button
                                            className={`cyber-button ${contactAdded ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={handleAddContact}
                                            disabled={contactAdded}
                                        >
                                            {contactAdded ? 'Contact added' : 'Add contact'}
                                        </button>
                                        <button className="cyber-button" onClick={handleSendCrypto}>
                                            Send Crypto
                                        </button>
                                        <button className="cyber-button" onClick={handleScanAgain}>
                                            Scan Again
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QRModal;