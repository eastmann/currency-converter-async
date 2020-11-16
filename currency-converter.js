const axios = require('axios');

// API's
// http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1
// https://restcountries.eu/rest/v2/currency/cop

const API_CURRENCIES = 'http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1';
const API_COUNTRIES = 'https://restcountries.eu/rest/v2/currency/cop';

// 1st function - getExchangeRate
const getExchangeRate = (fromCurrency, toCurrency) => {
    axios.get(API_CURRENCIES)
        .then(response => {
            const rates = response.data.rates;
            const euro = 1 / rates[fromCurrency];
            const exchangeRate = euro * rates[toCurrency];

            console.log(exchangeRate);
        })
        .catch(error => {
            throw new Error(error);
        });
};

// 2nd function - getCountries
// 3rd function - convertCurrency

// Call convert currency to get meaningful data.

getExchangeRate('EUR', 'RUB');
