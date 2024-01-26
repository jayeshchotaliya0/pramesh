import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { useTranslation } from "react-i18next";

import translationEN from "../../../assets/locales/en/translation.json";
import translationAR from "../../../assets/locales/ar/translation.json";
import translationFR from "../../../assets/locales/fr/translation.json";

import Selectbx from './Selectbox';

const fallbackLng = ["en"];
const availableLanguages = ["en", "ar", "fr"];

const resources = {
    en: {
        translation: translationEN
    },
    ar: {
        translation: translationAR
    },
    fr: {
        translation: translationFR
    }
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng,

        detection: {
            checkWhitelist: true
        },

        debug: false,

        whitelist: availableLanguages,

        interpolation: {
            escapeValue: false
        }
    });
    

const Language = () => 
{
    const { t } = useTranslation();
   
    return <>
        <div className="main">
            <div className="language-select">
                <Selectbx />
            </div>
            <div className="App">
                <div className="example-text">
                    <p>{t("hello_welcome_to_react")}</p>
                    <p>{t("this_is_an_example")}</p>
                    <label>{ t("please_enter_name") }</label>
                    
                </div>
            </div>
        </div>

        
    </>
}
export default Language;
