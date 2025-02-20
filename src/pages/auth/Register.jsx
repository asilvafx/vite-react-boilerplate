import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from 'lucide-react';
import PasswordStrengthBar from 'react-password-strength-bar';
import Cookies from "js-cookie";
import { TextInput, Label } from 'flowbite-react';
import { useAuth } from '../../context/AuthProvider';
import Loading from '../../components/Loading';

const Register = () => {
    const isLoggedIn = Cookies.get('isLoggedIn');

    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn){
            navigate('/dashboard');
        }
    }, [navigate, isLoggedIn]);

    const [input, setInput] = useState({
        username: '',
        fullName: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);
    const auth = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (input.password !== input.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (!isValidPassword(input.password)) {
            setError("Password must be at least 8 characters long and include letters, numbers, or special characters.");
            return;
        }
        const response = await auth.registerAction(input);
        if (response) {
            navigate('/login'); // Redirect to login after successful registration
        } else {
            setError("Registration failed. Please try again.");
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isValidPassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d|(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]))[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>?]{8,}$/;
        return regex.test(password);
    };

    if(isLoggedIn){
        return (<Loading />)
    }

    return (
        <section className="min-h-screen my-10 flex items-center justify-center px-4">
            <div className="premium-panel p-8 rounded-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <Box className="w-12 h-12 premium-icon" />
                    </div>
                    <h1 className="text-2xl font-bold neon-text mb-2">Create Account</h1>
                    <p className="text-gray-400">Join the CyberChest community</p>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <Label className="text-neutral-100" htmlFor="fullName" value="Full Name" />
                        <TextInput
                            id="fullName"
                            name="fullName"
                            placeholder="John Doe"
                            required
                            value={input.fullName}
                            onChange={handleInput}
                        />
                    </div>
                    <div>
                        <Label className="text-neutral-100" htmlFor="username" value="Email" />
                        <TextInput
                            id="username"
                            name="username"
                            type="email"
                            placeholder="example@yahoo.com"
                            required
                            value={input.username}
                            onChange={handleInput}
                        />
                    </div>
                    <div>
                        <Label className="text-neutral-100" htmlFor="password" value="Password" />
                        <TextInput
                            className="mb-4"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="********"
                            required
                            value={input.password}
                            onChange={handleInput}
                        />
                        <PasswordStrengthBar password={input.password} />
                    </div>
                    <div>
                        <Label className="text-neutral-100" htmlFor="confirmPassword" value="Confirm Password" />
                        <TextInput
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="********"
                            required
                            value={input.confirmPassword}
                            onChange={handleInput}
                        />
                    </div>

                    <button type="submit" className="cyber-button w-full">
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
                        Sign in
                    </Link>
                </p>
             </div>
</section>
);
};

export default Register;