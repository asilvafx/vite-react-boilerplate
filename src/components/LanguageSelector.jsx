import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        const newLang = e.target.value;
        localStorage.setItem('i18nextLng', newLang);
        i18n.changeLanguage(newLang);
    };

    return (
        <select
            value={i18n.language}
            onChange={handleChange}
            className="mx-auto w-full max-w-[200px] px-3 py-2 font-bold border rounded bg-white text-gray-800 cursor-pointer"
        >
            <option value="en">🇺🇸 English</option>
            <option value="fr">🇫🇷 French</option>
            <option value="pt">🇵🇹 Portuguese</option>
            <option value="es">🇪🇸 Spanish</option>
        </select>
    );
};

export default LanguageSelector;
