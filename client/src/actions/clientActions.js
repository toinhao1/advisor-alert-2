import axios from 'axios';
import {
  GET_CLIENT,
  GET_CLIENTS,
  CLIENT_LOADING,
  GET_ERRORS,
  ADD_CLIENT,
  DELETE_CLIENT
} from './types';

// Get current client
export const getCurrentClient = id => dispatch => {
  dispatch(setClientLoading());
  axios
    .get(`/clients/${id}`)
    .then(res =>
      dispatch({
        type: GET_CLIENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CLIENT,
        payload: {}
      })
    );
};

// Get All Clients
export const getClients = () => dispatch => {
  axios
    .get('/clients/all')
    .then(res =>
      dispatch({
        type: GET_CLIENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CLIENTS,
        payload: null
      })
    );
};

//Create Client
export const createClient = clientData => dispatch => {
  axios
    .post('/clients', clientData)
    .then(res =>
      dispatch({
        type: ADD_CLIENT,
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

// Delete Client
export const deleteClient = id => dispatch => {
  if (window.confirm('Are you sure this can not be undone!')) {
    axios
      .delete(`/clients/${id}`)
      .then(res =>
        dispatch({
          type: DELETE_CLIENT,
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

// Client loading
export const setClientLoading = () => {
  return {
    type: CLIENT_LOADING
  };
};
