import i18n from "@/plugins/i18n";

let date = new Date();

const URL = "https://api.themoviedb.org/3";

const APIKEY = "c9a3e87b703c630c13d5ea61ef62c7b6";

const CURRENT_YEAR = new Date().getFullYear();

const ONE_MONTH_AGO = `${date.getFullYear()}-${("0" + date.getMonth()).slice(-2)}-${("0" + date.getDate()).padStart(2, '0')}`;

const CURRENT_DATE = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).padStart(2, '0')}`;

const ONE_WEEK_AGO = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + (date.getDate() <= 7 ? 1 : date.getDate() - 7)).padStart(2, '0')}`;

const LANGUAGE = i18n.locale

export {
    URL,
    APIKEY,
    CURRENT_YEAR,
    ONE_MONTH_AGO,
    CURRENT_DATE,
    ONE_WEEK_AGO,
    LANGUAGE
}