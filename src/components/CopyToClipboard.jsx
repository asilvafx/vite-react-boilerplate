import {toast} from "react-hot-toast";
import {CircleCheckBig} from "lucide-react";
import React from "react";

const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text);
    toast.success(message, {
        icon: <CircleCheckBig className="w-4 h-4 text-green-500" />,
        duration: 2000,
    });
};

export default copyToClipboard;