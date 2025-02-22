import React from 'react';
import { Globe } from 'lucide-react';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' }
];

const LanguageSelector = () => {
    const handleLanguageChange = (e) => {
        const selectedLang = e.target.value;
        console.log('Language changed to:', selectedLang);
        // Here you would typically update your app's language context/state
    };

    return (
        <div>
            <div className="flex items-center space-x-3 mb-4">
                <Globe className="w-4 h-4 text-cyan-400" />
                <h4 className="text-md font-medium">Language</h4>
            </div>
            <select
                onChange={handleLanguageChange}
                defaultValue="en"
                className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
            >
                {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;