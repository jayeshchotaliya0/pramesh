import React from "react";
import ReactDOM from "react-dom";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
       
        // lng: document.querySelector('html').lang,
        fallbackLng: "en",
        detection: {
            order: ['cookie','htmlTag','localStorage','path', 'subdomain'],
            caches : ['cookie'],
        },

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
        backend : {
            loadPath: '/assets/{{lng}}/en.json',
        }

    });

const Language = () =>
{
    const { t } = useTranslation()
    return <>
        <h2>{t('Welcome_to_React')}</h2>
    </>
}
export default Language;