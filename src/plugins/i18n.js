import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

import en from "../lang/en_EN";
import es from "../lang/es_ES";

const storageLang = localStorage.getItem("storageLanguage");

const i18n = new VueI18n({
  locale: !storageLang.length ? window.navigator.language : storageLang,
  messages: {
    en: en,
    es: es,
    "es-ES": es,
    "en-EN": en,
  },
});

export default i18n;