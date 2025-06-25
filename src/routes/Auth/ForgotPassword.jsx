import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Turnstile from "react-turnstile";
import { motion, AnimatePresence } from "framer-motion";
import DBService from "../../data/rest.db";
import {decryptHash, encryptHash} from "../../lib/crypto";
import {IoMdEye, IoMdEyeOff} from "react-icons/io";

const TurnstileKey = process.env.CF_TURNSTILE_API || null;

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [step, setStep] = useState("email"); // 'email' | 'code' | 'reset'
    const [code, setCode] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    const [newPwd, setNewPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [isTurnstileVerified, setIsTurnstileVerified] = useState(false);

    const showPassword = () => setShowPwd((prev) => !prev);

    const passwordValid = (pwd) => {
        return (
            pwd.length >= 8 &&
            pwd.length <= 32 &&
            /[a-z]/.test(pwd) &&
            /[A-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)
        );
    };
    const handleReset = async (e) => {
        e.preventDefault();
        if (TurnstileKey && !isTurnstileVerified) {
            toast.error('Please complete the verification.');
            return;
        }
        setLoading(true);

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Enter a valid email.");
            return setLoading(false);
        }

        try {
            const address = email.toLowerCase();
            const user = await DBService.readBy("email", address, "users");
            if (!user) {
                toast.error("Email not found in our records.");
                return setLoading(false);
            }

            const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
            const encryptedCode = encryptHash(randomCode);
            setGeneratedCode(encryptedCode);

            toast.success(`Code sent to ${address}. Please, check your email inbox and spam folders. (Demo: ${randomCode})`);

            setStep("code");

            try {
                await DBService.mail(address, 'Password Reset!',encryptedCode, 'otp', 'crypt');
            } catch (e){
                console.log(e);
            }
        } catch (err) {
            toast.error("Error sending code.");
        }

        setLoading(false);
    };

    const handleCodeValidation = (e) => {
        e.preventDefault();
        if (code !== decryptHash(generatedCode)) return toast.error("Invalid code.");
        setStep("reset");
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!newPwd || newPwd !== confirmPwd) {
            toast.error("Passwords must match.");
            return setLoading(false);
        }

        if (!passwordValid(newPwd)) {
            toast.error("Password must be at least 8 characters with lowercase and one uppercase or number.");
            return setLoading(false);
        }

        try {
            const user = await DBService.readBy("email", email, "users");
            if (!user) return toast.error("User not found."), setLoading(false);

            const updated = {
                ...user,
                password: encryptHash(newPwd)
            };

            await DBService.update(user.id, updated, "users");
            toast.success("Password updated. You can now log in.");
            navigate('/auth', { state: { email } });
        } catch (err) {
            toast.error("Failed to update password.");
        }

        setLoading(false);
    };

    return (
        <>
            <Helmet>
                <title>Forgot Password</title>
            </Helmet>

            <div className="w-screen max-w-2xl m-auto px-4 py-8">
                <h1 className="text-center font-bold mb-8">Forgot Password</h1>

                <AnimatePresence mode="wait">
                    {step === "email" && (
                        <motion.form
                            key="email"
                            onSubmit={handleReset}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.4}}
                            className="bg-white p-6 rounded-2xl shadow-md space-y-4 max-w-md mx-auto"
                        >
                            <label className="block font-semibold text-gray-800">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full p-2 border rounded"
                                disabled={loading}
                            />
                            {TurnstileKey && (
                                <Turnstile
                                    sitekey={TurnstileKey}
                                    theme="light"
                                    size="flexible"
                                    onVerify={() => setIsTurnstileVerified(true)}
                                />
                            )}
                            <motion.button
                                type="submit"
                                whileTap={{scale: 0.95}}
                                whileHover={{scale: 1.02}}
                                disabled={loading || (TurnstileKey && !isTurnstileVerified)}
                                className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 disabled:opacity-50"
                            >
                                {loading ? "Sending..." : "Send Code"}
                            </motion.button>
                        </motion.form>
                    )}

                    {step === "code" && (
                        <motion.form
                            key="code"
                            onSubmit={handleCodeValidation}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.4}}
                            className="bg-white p-6 rounded-2xl shadow-md space-y-4 max-w-md mx-auto"
                        >
                            <label className="block font-semibold text-gray-800">Enter 6-digit code</label>
                            <input
                                type="number"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                maxLength="6"
                                placeholder="••••••"
                                className="w-full p-2 border rounded text-center tracking-widest text-xl"
                                disabled={loading}
                            />
                            <motion.button
                                type="submit"
                                whileTap={{scale: 0.95}}
                                whileHover={{scale: 1.02}}
                                className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800"
                            >
                                Confirm Code
                            </motion.button>
                        </motion.form>
                    )}

                    {step === "reset" && (
                        <motion.form
                            key="reset"
                            onSubmit={handlePasswordReset}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.4}}
                            className="bg-white p-6 rounded-2xl shadow-md space-y-4 max-w-md mx-auto"
                        >
                            <label className="block font-semibold text-gray-800">New Password</label>
                            <div className="flex items-center border rounded-xl px-3 h-12 focus-within:border-blue-500">
                                <input
                                    disabled={loading}
                                    type={showPwd ? "text" : "password"}
                                    placeholder="Enter your Password"
                                    value={newPwd}
                                    onChange={(e) => setNewPwd(e.target.value)}
                                    className="w-full border-none outline-none"
                                />
                                <button type="button" onClick={showPassword}
                                        className="text-sm bg-transparent border-none text-black ml-2">
                                    {showPwd ? <IoMdEyeOff size={22}/> : <IoMdEye size={22}/>}
                                </button>
                            </div>

                            <ul className="text-sm text-gray-500 list-disc ml-6 space-y-1">
                                <li className={newPwd.length >= 8 && newPwd.length <= 32 ? "text-green-600" : "text-red-500"}>
                                    8–32 characters
                                </li>
                                <li className={/[a-z]/.test(newPwd) ? "text-green-600" : "text-red-500"}>
                                    Includes lowercase letter
                                </li>
                                <li className={/[A-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPwd) ? "text-green-600" : "text-red-500"}>
                                    Includes uppercase, number, or symbol
                                </li>
                            </ul>

                            <label className="block font-semibold text-gray-800">Confirm New Password</label>
                            <div className="flex items-center border rounded-xl px-3 h-12 focus-within:border-blue-500">
                                <input
                                    disabled={loading}
                                    type={showPwd ? "text" : "password"}
                                    placeholder="Confirm your Password"
                                    value={confirmPwd}
                                    onChange={(e) => setConfirmPwd(e.target.value)}
                                    className="w-full border-none outline-none"
                                />
                                <button type="button" onClick={showPassword}
                                        className="text-sm bg-transparent border-none text-black ml-2">
                                    {showPwd ? <IoMdEyeOff size={22}/> : <IoMdEye size={22}/>}
                                </button>
                            </div>

                            <motion.button
                                type="submit"
                                whileTap={{scale: 0.95}}
                                whileHover={{scale: 1.02}}
                                className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800"
                            >
                                Reset Password
                            </motion.button>
                        </motion.form>
                    )}
                </AnimatePresence>

                <div className="mt-6 text-center">
                    <Link to="/auth" className="text-blue-500 hover:underline">← Back to Login</Link>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
