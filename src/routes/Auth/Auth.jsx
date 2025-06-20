import React, { useState, useEffect } from "react";
import DBService from "../../data/rest.db";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { decryptHash, encryptHash } from "../../lib/crypto";
import Cookies from "js-cookie";

const Auth = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [mode, setMode] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) navigate("/dashboard");
    }, [isAuthenticated, navigate]);

    const showPassword = () => setShowPwd((prev) => !prev);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!email || !password) return toast.error("Email and Password are required."), setLoading(false);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("Invalid email format."), setLoading(false);
        if (!confirmPassword || confirmPassword !== password) return toast.error("Passwords don't match."), setLoading(false);

        try {
            const existingUser = await DBService.readBy("email", email, "users");
            if (existingUser) return toast.error("Email already registered."), setLoading(false);

            const encryptedPassword = encryptHash(password);
            const timeNow = new Date().toTimeString();
            await DBService.create({ displayName: name, email, password: encryptedPassword, created_at: timeNow }, "users");
            toast.success("Account created! Log in now.");
            setMode("login");
        } catch (err) {
            toast.error("Registration failed.");
            console.error(err);
        }
        setLoading(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!email || !password) return toast.error("Email and Password are required."), setLoading(false);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("Invalid email format."), setLoading(false);

        try {
            const user = await DBService.readBy("email", email, "users");
            if (!user || decryptHash(user.password) !== password)
                return toast.error("Invalid credentials."), setLoading(false);

            login(user);
            Cookies.set("authUser", encryptHash(JSON.stringify(user)), { expires: 7 });
            toast.success("Login successful!");
            navigate("/");
        } catch (error) {
            toast.error("Login failed.");
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <>
            <Helmet>
                <title>Auth</title>
            </Helmet>

            <div className="w-screen max-w-2xl m-auto px-4 py-8">
                <h1 className="text-center font-bold mb-8">{mode === "login" ? "Login" : "Register"}</h1>

                <form className="bg-white p-6 rounded-2xl shadow-md space-y-4 max-w-md mx-auto">
                    {mode === "register" && (
                        <>
                            <label className="block font-semibold text-gray-800">Account Name</label>
                            <div className="flex items-center border rounded-xl px-3 h-12">
                                <input
                                    disabled={loading}
                                    type="text"
                                    placeholder="Enter your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border-none outline-none"
                                />
                            </div>
                        </>
                    )}

                    <label className="block font-semibold text-gray-800">Email</label>
                    <div className="flex items-center border rounded-xl px-3 h-12 focus-within:border-blue-500">
                        <input
                            disabled={loading}
                            type="text"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-none outline-none"
                        />
                    </div>

                    <label className="block font-semibold text-gray-800">Password</label>
                    <div className="flex items-center border rounded-xl px-3 h-12 focus-within:border-blue-500">
                        <input
                            disabled={loading}
                            type={showPwd ? "text" : "password"}
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-none outline-none"
                        />
                        <button type="button" onClick={showPassword} className="text-sm text-blue-500 ml-2">
                            {showPwd ? "Hide" : "Show"}
                        </button>
                    </div>

                    {mode === "register" && (
                        <>
                            <label className="block font-semibold text-gray-800">Confirm Password</label>
                            <div className="flex items-center border rounded-xl px-3 h-12 focus-within:border-blue-500">
                                <input
                                    disabled={loading}
                                    type={showPwd ? "text" : "password"}
                                    placeholder="Confirm your Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full border-none outline-none"
                                />
                            </div>
                        </>
                    )}

                    {mode === "login" && (
                        <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <Link to="/auth" className="text-blue-500 hover:underline">Forgot password?</Link>
                        </div>
                    )}

                    <button
                        disabled={loading}
                        onClick={mode === "login" ? handleLogin : handleRegister}
                        className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800"
                    >
                        {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        {mode === "login" ? (
                            <>
                                Don’t have an account?{" "}
                                <span className="text-blue-500 font-medium cursor-pointer" onClick={() => setMode("register")}>
                  Sign Up
                </span>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <span className="text-blue-500 font-medium cursor-pointer" onClick={() => setMode("login")}>
                  Sign In
                </span>
                            </>
                        )}
                    </p>

                    <div className="text-center text-gray-400 text-sm">Or With</div>

                    <div className="flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 border rounded-xl py-2 text-sm font-medium">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G" className="w-5 h-5" />
                            Google
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 border rounded-xl py-2 text-sm font-medium">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-5 h-5 invert" />
                            Apple
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/" className="text-blue-500 hover:underline">← Back to Home</Link>
                </div>
            </div>
        </>
    );
};

export default Auth;
