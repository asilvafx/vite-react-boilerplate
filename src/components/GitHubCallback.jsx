import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Loading from "./Loading";
import DBService from '../data/rest.db';
import Cookies from "js-cookie";
import {encryptHash} from "../lib/crypto.js";
import {useAuth} from "../hooks/useAuth";
import { useRef } from 'react';
import { toast } from "react-hot-toast";

function GitHubCallback() {
    const hasRun = useRef(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        const handleGitHubCallback = async () => {
            try {
                // Get code from URL parameters
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get('code');
                const error = urlParams.get('error');
                const errorDescription = urlParams.get('error_description');

                // Handle OAuth error from GitHub
                if (error) {
                    console.error('GitHub OAuth error:', error, errorDescription);
                    setError(`GitHub authentication failed: ${errorDescription || error}`);
                    setIsProcessing(false);
                    return;
                }

                // Check if code exists
                if (!code) {
                    setError('No authorization code received from GitHub');
                    setIsProcessing(false);
                    return;
                }

                // Send code to backend
                const resUri = process.env.API_BASE_URL || null;
                const response = await fetch(`${resUri}/auth/github`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any required authentication headers here
                    },
                    body: JSON.stringify({ code }),
                });

                // Check if the response is ok
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                // Handle the response from backend
                if (data?.success && data?.access_token) {
                    try {
                        // Fetch user data from your database
                        const userId = data.user.id;
                        let user = await DBService.readBy('github', userId, 'users');
                        if(!user){
                            const userData = {
                                displayName: data.user.name,
                                email: data.user.email,
                                github: userId,
                                created_at: new Date().toLocaleString()
                            };
                            const createUser = await DBService.create(userData, "users");
                            if(createUser){
                                user = await DBService.readBy('github', userId, 'users');
                            }
                        }

                        login(user);
                        Cookies.set("authUser", encryptHash(user), {
                            secure: true,
                            sameSite: 'lax',
                            path: '/',
                            expires: 7
                        });

                        // Navigate to success page or dashboard
                        toast.success("Login successful!");
                        navigate('/'); // or wherever you want to redirect successful users

                    } catch (dbError) {
                        console.error('Database error:', dbError);
                        setError('Failed to fetch user data from database');
                    }
                } else {
                    console.error('Backend response:', data);
                    setError(data?.error || 'Authentication failed');
                }

            } catch (fetchError) {
                console.error('Network or fetch error:', fetchError);
                setError('Network error occurred during authentication');
            } finally {
                setIsProcessing(false);
            }
        };

        handleGitHubCallback();
    }, [navigate]);

    // Handle redirect after error
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                navigate('/login'); // or wherever you want to redirect on error
            }, 3000); // 3 second delay to show error message

            return () => clearTimeout(timer);
        }
    }, [error, navigate]);

    // Show error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <strong className="font-bold">Authentication Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
                <p className="text-gray-600">Redirecting to login page...</p>
            </div>
        );
    }

    // Show loading state
    if (isProcessing) {
        return <Loading />;
    }

    // This shouldn't normally be reached, but just in case
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Processing authentication...</p>
        </div>
    );
}

export default GitHubCallback;