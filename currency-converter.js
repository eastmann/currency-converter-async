const axios = require('axios');

// API's
// http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1
// https://restcountries.eu/rest/v2/currency/cop

const API_CURRENCIES = 'http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1';
const API_COUNTRIES = 'https://restcountries.eu/rest/v2/currency';

// 1st function - getExchangeRate
const getExchangeRate = async (fromCurrency, toCurrency) => {
    const response = await axios.get(API_CURRENCIES);

    const rates = response.data.rates;
    const base = 1 / rates[fromCurrency];
    const exchangeRate = base * rates[toCurrency];

    if (isNaN(exchangeRate)) {
        throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
    }

    return exchangeRate;
};

// 2nd function - getCountries
const getCountries = async (toCurrency) => {
    try {
        const response = await axios.get(`${API_COUNTRIES}/${toCurrency}`);

        return response.data.map(country => country.name);
    } catch(error) {
        throw new Error(`Unable to get countries that use ${toCurrency}`);
    }
};

// 3rd function - convertCurrency
const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const countries = await getCountries(toCurrency);
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`;
}

// Call convert currency to get meaningful data.
convertCurrency('USD', 'CAD', 30)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error.message);
    })
;

// getExchangeRate('EUR', 'RUB');
// getCountries('RUB');
