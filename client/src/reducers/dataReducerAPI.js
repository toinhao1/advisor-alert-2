import {
  GET_REALTIME_PRICE_DATA,
  GET_TICKER_DATA,
  START_TICKER_SEARCH,
  START_PRICE_SEARCH
} from '../actions/types';

const initialState = {
  tickers: [],
  price: '',
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TICKER_DATA:
      console.log(action.payload)
      return {
        ...state,
        tickers: action.payload,
        loading: false
      }
    case GET_REALTIME_PRICE_DATA:
      return {
        ...state,
        price: action.payload,
        loading: false
      }
    case START_TICKER_SEARCH:
      return {
        ...state,
        loading: true
      }
    case START_PRICE_SEARCH:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}