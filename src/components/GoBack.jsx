import React from 'react';
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const GoBack = ({ url, text }) => { // Set default value for url
    return (
        <Link to={url ?? '/'} className="inline-flex items-center cyber-button !px-3">
            <ArrowLeft className="w-4 h-4" />
            {text && (
                <span>{text}</span>
            )}
        </Link>
    );
}

export default GoBack;