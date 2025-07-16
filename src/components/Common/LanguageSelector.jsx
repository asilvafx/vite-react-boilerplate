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
            value={LangOptions.find(opt => opt.value === i18n.language)}
            onChange={handleChange}
            options={LangOptions}
            styles={{
                control: (base, state) => ({
                    ...base,
                    backgroundColor: '#333',
                    borderRadius: '0.3rem',
                    borderColor: state.isFocused ? '#999' : '#ccc',
                    boxShadow: 'none',
                    '&:hover': {
                        borderColor: '#aaa'
                    }
                }),
                menu: (base) => ({
                    ...base,
                    backgroundColor: '#333',
                }),
                option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                        ? '#444'
                        : state.isFocused
                            ? '#333'
                            : '#333',
                    color: '#f0f0f0',
                    cursor: 'pointer',
                }),
                singleValue: (base) => ({
                    ...base,
                    color: '#f0f0f0',
                }),
            }}
        />
    );
};

export default LanguageSelector;
