import { useState } from 'react'
import { useTranslation } from 'react-i18next';

import reactLogo from '../../assets/react.svg'
import viteLogo from '../../assets/vite.svg'

function Home() {
    const [count, setCount] = useState(0)
    const { t } = useTranslation()

    return (
        <>
            <title>{t('seo_title')}</title>
            <meta name='description' content={t('seo_description')}/>
            
            <section className="p-8">
                <div className="flex gap-4 mb-4">
                    <a href="https://vite.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo"/>
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo"/>
                    </a>
                </div>
                <h1 className="text-3xl font-bolder mb-2">
                    Vite + React
                </h1>
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>
                    <p>
                        Edit <code>src/App.jsx</code> and save to test HMR
                    </p>
                </div>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            </section>
        </>
    )
}

export default Home
