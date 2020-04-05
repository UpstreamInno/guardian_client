export const fallback = "en";

export const supportedLocales = {
    en: {
        name: "English",
        translationFileLoader: () => require('../../assets/languages/en.json'),

        // en is default locale in Moment
        momentLocaleLoader: () => Promise.resolve(),
    },

    // Other languages config will be like this
    /*es:{
        Name: "Spanish",
        translationFileLoader: () => require('../../assets/languages/es.json'),
        momentLocaleLoader: () => import('moment/locale/es'),
    }*/
};

export const defaultNamespace = "common";

export const namespaces = [
    "common",
];