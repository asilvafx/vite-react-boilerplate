import React from 'react';
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const GoBack = ({ url }) => { // Set default value for url
    return (
        <Link to={url ?? '/'} className="inline-flex items-center cyber-button !px-3">
            <ArrowLeft className="w-4 h-4" />
        </Link>
    );
}

export default GoBack;