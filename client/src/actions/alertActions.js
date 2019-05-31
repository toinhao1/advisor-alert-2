import axios from 'axios';
import {
  GET_ALERT,
  GET_ALERTS,
  ALERT_LOADING,
  GET_ERRORS,
  ADD_ALERT,
  DELETE_ALERT,
  CLEAR_ERRORS
} from './types';

// Get current alert
export const getCurrentAlert = id => dispatch => {
  dispatch(setAlertLoading());
  axios
    .get(`/alerts/${id}`)
    .then(res =>
      dispatch({
        type: GET_ALERT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALERT,
        payload: null
      })
    );
};

// Get All Alerts of a Certain Client
export const getAlerts = id => dispatch => {
  dispatch(setAlertLoading());
  axios
    .get(`/alerts/all/${id}`)
    .then(res =>
      dispatch({
        type: GET_ALERTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALERTS,
        payload: null
      })
    );
};

//Create Alert
export const createAlert = (id, alertData) => dispatch => {
  axios
    .post(`/alerts/${id}`, alertData)
    .then(res =>
      dispatch({
        type: ADD_ALERT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Alert
export const deleteAlert = id => dispatch => {
  if (window.confirm('Are you sure this can not be undone!')) {
    axios
      .delete(`/alerts/${id}`)
      .then(res =>
        dispatch({
          type: DELETE_ALERT,
          payload: id
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err
        })
      );
  }
};

// Alert loading
export const setAlertLoading = () => {
  return {
    type: ALERT_LOADING
  };
};

// Set loading state
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
