import React, { useState } from 'react';
import { useAuth } from "../context/AuthProvider";
import { Modal } from "flowbite-react";
import { useTranslation } from "react-i18next";
import DBService from '../data/db.service';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import {encryptPassword, decryptPassword} from "../lib/crypto.js";

const ModalConnect = ({ show, onClose }) => {
    const { t } = useTranslation();
    const auth = useAuth();

    const [isRegistering, setIsRegistering] = useState(false);
    const [input, setInput] = useState({
        username: "",
        password: "",
        fullName: "",
        confirmPassword: "",
    });

    const handleLogin = (e) => {
        e.preventDefault();
        if (input.username === "" || input.password === "") {
            alert("Login failed. Invalid credentials.");
            return;
        }
        auth.loginAction(input);
    };

    const handleRegister = async (e) => { // Fixed the syntax error here
        e.preventDefault();
        if (input.password !== input.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        if (!isValidPassword(input.password)) {
            alert("Password must be at least 8 characters long and include letters, numbers, or special characters.");
            return;
        }

        const userCheck = await DBService.getItemByKeyValue('email', input.username, 'users');

        if(userCheck){
            alert('Email address already exists in our system!');
            return;
        }

        const userData = {
            email: input.username,
            password: encryptPassword(input.password),
            fullName: input.fullName,
        };

        try {
            await DBService.create(userData, 'users');
            alert("Registration successful!");
            setIsRegistering(false);
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Registration failed. Please try again.");
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
            <Modal size="md" className="modal" dismissible show={show} onClose={onClose}>
                <Modal.Header>{isRegistering ? "Create an Account" : "Login to Your Account"}</Modal.Header>
                <Modal.Body>
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