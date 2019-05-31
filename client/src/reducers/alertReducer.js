import {
  ADD_ALERT,
  GET_ALERTS,
  GET_ALERT,
  ALERT_LOADING,
  DELETE_ALERT
} from '../actions/types';

const initialState = {
  alerts: [],
  alert: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ALERT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALERTS:
      return {
        ...state,
        alerts: action.payload,
        loading: false
      };
    case GET_ALERT:
      return {
        ...state,
        alert: action.payload,
        loading: false
      };
    case ADD_ALERT:
      return {
        ...state,
        alerts: [action.payload, ...state.alerts]
      };
    case DELETE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert._id !== action.payload)
      };
    default:
      return state;
  }
}
