import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet-async";

function Sample() {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t('seo_title')}</title>
                <meta name='description' content={t('seo_description')} />
            </Helmet>

        </>
    );
}

export default Sample;
