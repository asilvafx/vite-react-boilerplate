import React from 'react';
import {Helmet} from "react-helmet-async";
import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";
import CrudApi from "../components/CrudApi";

const Sample = () => {

  const { t } = useTranslation();

  return (
      <>
          <Helmet>
              <title>{t('seo_title')}</title>
              <meta name='description' content={t('seo_description')} />
          </Helmet>

          {/* Hero Section */}
          <section className="text-center py-20 px-4">
              <h1 className="text-5xl md:text-7xl font-bold text-neon-blue">
                  CRUD Example
              </h1>
              <h2 className="text-2xl md:text-3xl mt-4">
                  Create, Read, Update & Delete
              </h2>
              <CrudApi />
              <Link to="/">
                  <button className="mt-8 px-6 py-3 font-bold rounded-full transition duration-300">
                      Go Back
                  </button>
              </Link>
          </section>
      </>
  )
}

export default Sample;