import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Box } from 'lucide-react';
import { TextInput, Label, Button } from 'flowbite-react';
import { useAuth } from '../../context/AuthProvider';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (formData.username === "" || formData.password === "") {
            setError("Login failed. Invalid credentials.");
            return;
        }
        const response = await auth.loginAction(formData);
        if (response === true) {
            navigate('/dashboard');
        } else {
            setError(response || "Login failed. Please try again.");
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center my-10 px-4">
            <div className="premium-panel p-8 rounded-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <Box className="w-12 h-12 premium-icon" />
                    </div>
                    <h1 className="text-2xl font-bold neon-text mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to your CyberChest account</p>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="username" value="Email" className="text-gray-300 mb-2" />
                        <TextInput
                            id="username"
                            type="email"
                            placeholder="example@yahoo.com"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="password" value="Password" className="text-gray-300 mb-2" />
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="********"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                                Remember me
                            </label>
                        </div>
                        <Link to="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300">
                            Forgot password?
                        </Link>
                    </div>

                    <button type="submit" className="cyber-button w-full">
                        Sign in
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-cyan-400 hover:text-cyan-300">
                        Create one
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Login;