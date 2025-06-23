import React from 'react';
import github_icon from "../assets/github.svg";

function GitHubLoginButton() {

    const clientID = process.env.GITHUB_CLIENT_ID || null;

    const loginWithGitHub = (e) => {
        e.preventDefault();
        const redirectURI = 'http://localhost:5173/auth/github/callback';
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
    };

    if(!clientID){
        return null;
    }
    return <button type="button" className="flex items-center justify-center gap-2 flex-1" onClick={loginWithGitHub}>
        <img className="pointer-events-none w-auto h-5 filter invert" src={github_icon} width={30} height={30}
             alt="Github"/>
        GitHub
    </button>;
}

export default GitHubLoginButton;