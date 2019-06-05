const keys = require('../../config/keys');
const request = require('request');

const key = keys.ALPHA_VANTAGE_API_KEY;

const stockSearch = symbol => {
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${key}`;

  request({ url, json: true }, (err, res) => {
    const ticker = res.body;
    res.json({ ticker });
  });
};

module.exports = stockSearch;
