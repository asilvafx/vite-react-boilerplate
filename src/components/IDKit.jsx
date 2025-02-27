import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';
import { Shield } from "lucide-react";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useUser  } from '../context/UserProvider';
import DBService from '../data/db.service';
import { updateData } from '../lib/user';

const IDKit = ({ setIsVerified }) => { // Accept setIsVerified as a prop
    const { userData } = useUser ();
    const { t } = useTranslation();
    const [verified, setVerified] = useState(false);

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

            const fetchUrl = `${WLD_ServerUrl}?appId=${WLD_AppId}`;

            // Call your API route to verify the proof using axios
            const res = await axios.post(fetchUrl, modifiedProof, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Check if the response is successful
            if (res.status !== 200) {
                throw new Error('Verification failed.');
            }

            const nullifierHash = res.data.data.nullifier_hash; // Accessing nullifier_hash

            // If verification is successful, update the verified state
            setVerified(true);
            await handleVerification(nullifierHash);

        } catch (error) {
            console.error('Error during verification:', error);
            toast.error('Verification failed. Please try again.'); // Inform the user
        }
    };

    const handleVerification = async (proof) => {
        const userKey = userData?.uid;

        const checkIfAlreadyExists = await DBService.getItemByKeyValue('world_id', proof, 'users');

        if(checkIfAlreadyExists){
            toast.error("Verification failed! World ID already associated to a different account.");
            return;
        }

        const data = {
            is_verified: true,
            world_id: proof
        };

        await DBService.update(userKey, data, 'users');
        await updateData();

        toast.success("Verification successful!");
        setIsVerified(true); // Update the verification state in the parent component
    };

    const onSuccess = () => {
        //console.log(userHash);
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
                    false
                    verification_level={VerificationLevel.Orb}
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
                    <p>🎉 Successfully verified!</p>
                </div>
            )}
        </>
    );
};

export default IDKit;