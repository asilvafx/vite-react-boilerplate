import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Loader2, X } from 'lucide-react';
import toast from "react-hot-toast";

const QRCodeScanner = ({ onScanResult, onClose }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const qrEl = document.getElementById('qr-reader');

        if (!qrEl) return; // Ensure the qr-reader element exists

        const newScanner = new Html5QrcodeScanner(
            "qr-reader",
            {
                fps: 10,
                qrbox: { width: 200, height: 200 },
                rememberLastUsedCamera: true,
            },
            false
        );

        newScanner.render(
            (decodedText) => {
                if (!decodedText.startsWith('0x') || decodedText.length !== 42) { 
                    return;
                }
                onScanResult(decodedText); // Pass the scanned result to the parent
                newScanner.pause(); // Pause the scanner after a successful scan
                onClose(); // Close the scanner after scanning
            },
            (error) => {
                console.error('QR Scan error:', error);
            }
        );

        setLoading(false); // Set loading to false once the scanner is ready

        return () => {
            if (newScanner) {
                try {
                    newScanner.clear();
                } catch (error) {
                    console.error('Error clearing scanner:', error);
                }
            }
        };
    }, [onScanResult, onClose]); // Remove isScannerInitialized from the dependency array

    // Return the QR reader div immediately
    return (
        <div className="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="premium-panel p-6 rounded-xl w-[360px] mx-4 relative" style={{ maxHeight: 'calc(100vh - 2rem)' }}>
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                    <X className="w-4 h-4 text-gray-400" />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-xl font-medium neon-text">QR Code Scanner</h2>
                    <p className="text-sm text-gray-400 mt-1">Scan or share your wallet address</p>
                </div>
                {loading && (
                    <div className="flex items-center justify-center">
                        <Loader2 className="w-12 h-12 animate-spin text-cyan-400" />
                    </div>
                )}
                <div id="qr-reader" className="premium-panel rounded-xl overflow-hidden" />
            </div>
        </div>
    );
};

export default QRCodeScanner;