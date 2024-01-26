import { useTranslation } from 'react-i18next';

function MyComponent() {
    const { t } = useTranslation();
    // this_is_an_example is the key against translation in locales/en/translation.json file.
    return <h1>{t('this_is_an_example')}</h1>
}