import React, { useState } from 'react';
import { useAuth } from "../context/AuthProvider";
import { Modal } from "flowbite-react";
import { useTranslation } from "react-i18next";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const ModalConnect = ({ show, onClose }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const auth = useAuth();

    const [error, setError] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [input, setInput] = useState({
        username: "",
        password: "",
        fullName: "",
        confirmPassword: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        if (input.username === "" || input.password === "") {
            setError("Login failed. Invalid credentials.");
            return;
        }
        const response = await auth.loginAction(input);
        if (response === true) {
            navigate('/dashboard'); 
        } else {
            setError(response || "Login failed. Please try again.");
        }
    };

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
            setIsRegistering(false);
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

    return (
        <div>
            <Modal size="md" position="center" className="modal bg-neutral-100/80 dark:bg-neutral-900/80" dismissible show={show} onClose={onClose}>
                <Modal.Header className="bg-neutral-200/80 dark:bg-neutral-900/90">{isRegistering ? "Create an Account" : "Login to Your Account"}</Modal.Header>
                <Modal.Body className="bg-neutral-200/80 dark:bg-neutral-900/90">
                    {error && <p className="text-red-500">{error}</p>}
                    {isRegistering ? (
                        <RegisterForm input={input} handleInput={handleInput} handleRegister={handleRegister} />
                    ) : (
                        <LoginForm input={input} handleInput={handleInput} handleLogin={handleLogin} />
                    )}
                    <div className="mt-4 text-center">
                        <span onClick={() => setIsRegistering(!isRegistering)} className="text-blue-500 cursor-pointer">
                            {isRegistering ? "Already have an account? Login" : "Create a new account"}
                        </span>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ModalConnect;