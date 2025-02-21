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
        <div className="premium-panel p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
                <Globe className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-medium">Language</h3>
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