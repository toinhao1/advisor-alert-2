const axios = require('axios')
const keys = require('../../config/keys');

// @route POST / get real time price of the ticker
const getPricesForTicker = async (symbol) => {
  try {
    const response = await axios({
      method: "get",
      url: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${keys.ALPHAVANTAGE_API_KEY}`,
    })
    return response.data["Global Quote"]["05. price"].slice(0, -2)
  } catch (err) {
    console.log(err, "There was an error")
  }
}

module.exports = getPricesForTicker