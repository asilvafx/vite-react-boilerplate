import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';
import {Shield} from "lucide-react";

const IDKit = () => {
    const { t } = useTranslation();
    const [verified, setVerified] = useState(false); // Define verified state
    const [userHash, setUserHash] = useState(null); // Define verified state

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

            // Call your API route to verify the proof
            const res = await fetch(WLD_ServerUrl + '?appId=' + WLD_AppId, { // Update the URL to your backend server
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modifiedProof),
            });

            if (!res.ok) {
                throw new Error('Verification failed.');
            }

            // If verification is successful, update the verified state
            setVerified(true);
            const response = await res.json();

            const nullifierHash = response.data.nullifier_hash; // Accessing nullifier_hash
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

    return (
        <>
            {!verified ? (
                <IDKitWidget
                    app_id={WLD_AppId} // obtained from the Developer Portal
                    action={WLD_Action} // this is your action name from the Developer Portal
                    verification_level={WLD_VerificationLevel}  // Use the verification level
                    handleVerify={handleVerify}
                    onSuccess={onSuccess}>
                    {({open}) =>
                        <button
                            className="cyber-button flex items-center space-x-2 group"
                            onClick={open}>
                            <Shield
                                className="w-5 h-5 group-hover:scale-110 transition-transform duration-500"/>
                            <span>Verify with WorldID</span>
                        </button>
            }
        </IDKitWidget>
    )
:
    (
        <div className="flex flex-col">
            <p>🎉 Successfully authenticated! </p>
            <p>Hash: {userHash}</p>
        </div>
    )
}
</>
)
    ;
};

export default IDKit;