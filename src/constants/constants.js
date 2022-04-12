import i18n from "@/plugins/i18n";

// Variables
let currentDate = new Date();

// Functions
const getCurrentDay = () => {
    let millis = currentDate.getTime();
    let todayString = new Date(millis).toLocaleDateString('en-UK')
    return todayString; // => return the date in DD/MM/YYYY format
}

const getDateAgo = (days) => {
    let aDateAgo = currentDate.setDate(currentDate.getDate() - days)
    let dateToString = new Date(aDateAgo).toLocaleDateString('en-UK')
    return dateToString; // => return the date in DD/MM/YYYY format
}

// We need YYYY-MM-DD format for the API
const formatDate = (date) => {
    let [day, month, year] = date.split('/')
    return `${year}-${month}-${day}`
}


// Constants
const URL = "https://api.themoviedb.org/3";

const APIKEY = "c9a3e87b703c630c13d5ea61ef62c7b6";

const CURRENT_YEAR = new Date().getFullYear();

const CURRENT_DATE = formatDate(getCurrentDay());

const ONE_WEEK_AGO = formatDate(getDateAgo(7));

const ONE_MONTH_AGO = formatDate(getDateAgo(30));

const LANGUAGE = i18n.locale

console.log('Language: ', LANGUAGE);

// Exports
export {
    URL,
    APIKEY,
    CURRENT_YEAR,
    ONE_MONTH_AGO,
    CURRENT_DATE,
    ONE_WEEK_AGO,
    LANGUAGE
}