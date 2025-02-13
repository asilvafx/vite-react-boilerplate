// src/components/LoginForm.jsx
import React from 'react';
import { Button, TextInput, Label } from "flowbite-react";

const LoginForm = ({ input, handleInput, handleLogin }) => {
    return (
        <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-4 mb-4">
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
                </div>
            </div>
            <div className="grid">
                <Button type="submit" className="w-full m-0 font-bold capitalize">
                    Login
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;