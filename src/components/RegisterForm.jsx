// src/components/RegisterForm.jsx
import React from 'react';
import { Button, TextInput, Label } from "flowbite-react";
import PasswordStrengthBar from 'react-password-strength-bar';

const RegisterForm = ({ input, handleInput, handleRegister }) => {
    return (
        <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-4 mb-4">
                <div>
                    <Label htmlFor="fullName" value="Full Name" />
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
                    <Label htmlFor="username" value="Enter your email" />
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
                    <Label htmlFor="password" value="Enter your password" />
                    <TextInput
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
                    <Label htmlFor="confirmPassword" value="Confirm your password" />
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
            </div>
            <div className="grid">
                <Button type="submit" className="w-full m-0 font-bold capitalize">
                    Register
                </Button>
            </div>
        </form>
    );
};

export default RegisterForm;