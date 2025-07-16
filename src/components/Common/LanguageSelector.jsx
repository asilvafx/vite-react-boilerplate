import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const LangOptions = [
        { value: 'en', label: '🇺🇸\u00A0 English' },
        { value: 'fr', label: '🇫🇷\u00A0 French' },
        { value: 'pt', label: '🇵🇹\u00A0 Portuguese' },
        { value: 'es', label: '🇪🇸\u00A0 Spanish' }
    ];

    const handleChange = (selectedOption) => {
        const newLang = selectedOption.value;
        i18n.changeLanguage(newLang).then(() =>
            localStorage.setItem('i18nextLng', newLang)
        );
    };

    return (
        <Select
            className="bg-white text-gray-800 cursor-pointer"
            value={LangOptions.find(opt => opt.value === i18n.language)}
            onChange={handleChange}
            options={LangOptions}
        />
    );
};

export default LanguageSelector;
