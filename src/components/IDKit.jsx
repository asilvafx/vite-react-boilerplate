import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IDKitWidget } from '@worldcoin/idkit';
import worldid_icon from '../assets/worldcoin.svg';

const IDKit = () => {
    const { t } = useTranslation();
    const [verified, setVerified] = useState(false); // Define verified state
    const [userHash, setUserHash] = useState(null); // Define verified state

    const WLD_Action = process.env.WLD_ACTION || "test"; // Action name
    const WLD_AppId = process.env.WLD_APP_ID || "app_000000000101010101"; // App ID from Developer Portal
    const WLD_VerificationLevel = process.env.WLD_VERIFICATION_LVL || "device"; // Verification level
    const WLD_ServerUrl = process.env.API_BASE_URL || null; // Server URL


    const handleVerify = async (proof) => {
        try {
            const modifiedProof = {
                ...proof,
                action: WLD_Action // action name you want to use
            };

            console.log(modifiedProof);

            // Call your API route to verify the proof
            const res = await fetch(`${WLD_ServerUrl}/auth/worldId`, { // Update the URL to your backend server
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modifiedProof),
            });    
            
            // Check if the response is successful
            if (!res.ok) {
                throw new Error('Verification failed.');
            }

            const response = await res.json();

            const nullifierHash = response.data.nullifier_hash; // Accessing nullifier_hash

            // If verification is successful, update the verified state
            setVerified(true);

            console.log('Nullifier Hash:', nullifierHash); // Log the nullifier_hash

            setUserHash(nullifierHash);

        } catch (error) {
            console.error('Error during verification:', error);
        }
    };


    const onSuccess = () => {
        // Redirect or perform any action after the modal is closed
        console.log('Login successfully!')
    };

    const onError = (error) => {
        console.error('Error during IDKit verification:', error); 
    };


    return (
        <>
            {!verified ? (
                <IDKitWidget
                    app_id={WLD_AppId} // obtained from the Developer Portal
                    action={WLD_Action} // this is your action name from the Developer Portal
                    false
                    verification_level={WLD_VerificationLevel}  // Use the verification level
                    handleVerify={handleVerify}
                    onSuccess={onSuccess}
                    onError={onError}
                >
                    {({ open }) => (
                        <button
                                type="button"
                                className="flex items-center justify-center gap-2 flex-1"
                                onClick={open}>
                                    <img className="pointer-events-none w-auto h-5 filter invert" src={worldid_icon} width={30} height={30} alt="WorldID" />
                                    World ID
                        </button>
                    )}
                </IDKitWidget>
            ) : (
                <div className="flex flex-col">
                    <p>🎉 Successfully authenticated! </p>
                    <p>Hash: {userHash}</p>
                </div>
            )}
        </>
    );
};

export default IDKit;
