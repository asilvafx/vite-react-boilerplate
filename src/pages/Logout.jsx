import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Logout = () => {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t('seo_title')}</title>
                <meta name='description' content={t('seo_description')}/>
            </Helmet>
        </>
    )
}

export default Logout