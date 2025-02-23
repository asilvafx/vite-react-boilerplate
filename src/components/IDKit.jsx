import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IDKitWidget } from '@worldcoin/idkit';
import { Shield } from "lucide-react";
import toast from 'react-hot-toast'; // Ensure you import toast for notifications

const IDKit = () => {
    const { t } = useTranslation();
    const [verified, setVerified] = useState(false);
    const [userHash, setUserHash] = useState(null);

    const WLD_Action = process.env.WLD_ACTION || ""; // Action name
    const WLD_AppId = process.env.WLD_APP_ID || ""; // App ID from Developer Portal
    const WLD_VerificationLevel = process.env.WLD_VERIFICATION_LVL || ""; // Verification level
    const WLD_ServerUrl = process.env.WLD_SERVER_URL || ""; // Server URL

    const handleVerify = async (proof) => {
        try {
            const modifiedProof = {
                ...proof,
                action: WLD_Action // action name you want to use
            };

            console.log(modifiedProof);

            const fetchUrl = `${WLD_ServerUrl}?appId=${WLD_AppId}`;

            // Call your API route to verify the proof
            const res = await fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modifiedProof),
            });

            if (!res.ok) {
                throw new Error('Verification failed.');
            }

            const response = await res.json();
            const nullifierHash = response.data.nullifier_hash; // Accessing nullifier_hash
            console.log('Nullifier Hash:', nullifierHash); // Log the nullifier_hash

            // If verification is successful, update the verified state
            setVerified(true);
            setUserHash(nullifierHash);

        } catch (error) {
            console.error('Error during verification:', error);
            toast.error('Verification failed. Please try again.'); // Inform the user
        }
    };

    const onSuccess = () => {
        console.log('Login successfully!');
    };

    const onError = (error) => {
        console.error('Error during IDKit verification:', error);
        toast.error('An error occurred during verification. Please try again.'); // Inform the user
    };

    return (
        <>
            {!verified ? (
                <IDKitWidget
                    app_id={WLD_AppId}
                    action={WLD_Action}
                    signal={WLD_Action}
                    verification_level={WLD_VerificationLevel}
                    handleVerify={handleVerify}
                    onSuccess={onSuccess}
                    onError={onError}
                >
                    {({ open }) => (
                        <button
                            className="cyber-button flex items-center space-x-2 group"
                            onClick={open}
                        >
                            <Shield className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
                            <span>Verify with WorldID</span>
                        </button>
                    )}
                </IDKitWidget>
            ) : (
                <div className="flex flex-col">
                    <p>🎉 Successfully authenticated!</p>
                    <p>Hash: {userHash}</p>
                </div>
            )}
        </>
    );
};

export default IDKit;