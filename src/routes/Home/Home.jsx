import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { useAuth } from '../../hooks/useAuth';

import reactLogo from '../../assets/react.svg'
import viteLogo from '../../assets/vite.svg'

function Home() {
    const [count, setCount] = useState(0)
    const { t } = useTranslation()
    const { user, isAuthenticated } = useAuth()

    return (
        <>
            <Helmet>
                <title>{t('seo_title')}</title>
                <meta name='description' content={t('seo_description')}/>
            </Helmet>

            <section className="p-8 w-screen max-w-2xl flex flex-col justify-center items-center m-auto">
                <div className="flex gap-4 mb-4">
                    <a href="https://vite.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo"/>
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo"/>
                    </a>
                </div>
                <h1 className="text-3xl font-bolder mb-4">
                    { user?.displayName ? (
                        <span>Welcome back, {user?.displayName}</span>
                    ) : (
                        <span>Vite + React</span>
                    )}

                </h1>
                <nav className="flex gap-2 items-center">
                <Link to='/shop'>
                    <button>
                        Shop
                    </button>
                </Link>
                {!isAuthenticated ? (
                    <Link to='/auth'>
                    <button>
                        Click here to login
                    </button>
                    </Link>
                ) : (
                    <Link to='/logout'>
                        <button>
                            Logout
                        </button>
                    </Link>
                )}
                </nav>
            </section>
        </>
    )
}

export default Home
