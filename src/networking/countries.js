import Config from "./config"


export default class CountriesAPI {

    /* Method to get all countries via created NodeJS API */
    static getAllCountries = async () => {
        const url = `${Config.API_URL}/countries`;
        const response = await fetch(url);
        return response.json();
    }

    /* Method to get unique country by name via the created NodeJS API */
    static getUniqueCountry = async (name) => {
        const url = `${Config.API_URL}/countries/name/${name}`;
        console.log("Unique Country Request =>", url);
        const response = await fetch(url);
        return response.json();
    }

    /* Method to get matching countries by query via the created NodeJS API */
    static searchCountries = async (query) => {
        const url = `${Config.API_URL}/countries/search/${query}`;
        const response = await fetch(url);
        return response.json();
    }

}