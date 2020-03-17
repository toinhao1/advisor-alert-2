import axios from 'axios';
import { GET_REALTIME_PRICE_DATA, GET_TICKER_DATA, START_PRICE_SEARCH, START_TICKER_SEARCH } from './types'

export const startSearch = () => ({
  type: START_TICKER_SEARCH
})

export const startPriceSearch = () => ({
  type: START_PRICE_SEARCH
})

// search alphavantage for companies matching the qeury
export const searchForTicker = (query) => async dispatch => {
  dispatch(startSearch())

  const res = await axios.post('/api/search', { query })
  const tickers = res.data.bestMatches.map(ticker => {
    return { symbol: ticker["1. symbol"], name: ticker["2. name"] }
  })
  dispatch({ type: GET_TICKER_DATA, payload: tickers })
}

// get price data from alphavantage
export const getPriceData = (ticker) => async dispatch => {
  if (ticker) {
    dispatch(startPriceSearch())

    const res = await axios.post('/api/prices', ticker)

    dispatch({ type: GET_REALTIME_PRICE_DATA, payload: res.data })

  }
}