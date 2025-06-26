import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IDKitWidget } from '@worldcoin/idkit';
import worldid_icon from '../../assets/worldcoin.svg';
import DBService from '../../data/rest.db.js';
import Cookies from "js-cookie";
import {encryptHash} from "../../lib/crypto.js";
import {useAuth} from "../../hooks/useAuth.js";
import {useNavigate} from "react-router-dom";
import { toast } from "react-hot-toast";

const IDKit = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuth();

    const WLD_Action = process.env.WLD_ACTION || null; // Action name
    const WLD_AppId = process.env.WLD_APP_ID || null; // App ID from Developer Portal
    const WLD_VerificationLevel = process.env.WLD_VERIFICATION_LVL || "device"; // Verification level: device/orb
    const WLD_ServerUrl = process.env.API_BASE_URL || null; // Server URL


    const handleVerify = async (proof) => {
        try {
            const modifiedProof = {
                ...proof,
                action: WLD_Action // action name you want to use
            };

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

            const nullifierHash = modifiedProof.nullifier_hash;
            const verificationLevel = modifiedProof.verification_level;

            let user = await DBService.readBy('world_id', nullifierHash, 'users');
            if(!user){
                const userData = {
                    world_id: nullifierHash,
                    world_ver: verificationLevel,
                    created_at: new Date().toLocaleString()
                };
                const createUser = await DBService.create(userData, "users");
                if(createUser){
                    user = await DBService.readBy('world_id', nullifierHash, 'users');
                }
            }

            login(user);
            Cookies.set("authUser", encryptHash(user), {
                secure: true,
                sameSite: 'lax',
                path: '/',
                expires: 7
            });

        } catch (error) {
            console.error('Error during verification:', error);
        }
    };


    const onSuccess = () => {
        // Redirect or perform any action after the modal is closed
        toast.success("Login successful!");
        navigate('/');
    };

    const onError = (error) => {
        console.error('Error during IDKit verification:', error); 
    };

    if(!WLD_AppId){
        return null;
    }

    return (
        <>
            <IDKitWidget
                app_id={WLD_AppId} // obtained from the Developer Portal
                action={WLD_Action} // this is your action name from the Developer Portal
                disable_default_modal_behavior={true}
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
        </>
    );
};

export default IDKit;
