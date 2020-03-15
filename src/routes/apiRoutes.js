const express = require('express');
const router = express.Router();
const axios = require('axios')
const keys = require('../../config/keys');

// @route POST / get 10 companies matching the query
router.post('/search', async (req, res) => {
  try {
    const response = await axios({
      method: "get",
      url: `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.body.query}&apikey=${keys.ALPHAVANTAGE_API_KEY}`,
    })
    res.json(response.data);
  } catch (err) {
    res.status(400).json({ err: 'This is the error', err });
  }
}
);

// @route POST / get real time price of the ticker
router.post('/prices', async (req, res) => {
  console.log(req.body)
  try {
    const response = await axios({
      method: "get",
      url: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.body.symbol}&apikey=${keys.ALPHAVANTAGE_API_KEY}`,
    })
    res.json(response.data);
  } catch (err) {
    res.status(400).json({ err: 'This is the error', err });
  }
}
);

module.exports = router

