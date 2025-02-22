import {toast} from "react-hot-toast";
import React from "react";

const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text);
    toast.success(message, {
        duration: 2500,
    });
};

export default copyToClipboard;