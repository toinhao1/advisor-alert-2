import axios from 'axios';
import { GET_CLIENT, GET_CLIENTS, CLIENT_LOADING, GET_ERRORS } from './types';

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
  // dispatch(setClientLoading());
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
export const createClient = (clientData, history) => dispatch => {
  axios
    .post('/clients', clientData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Client
export const deleteClient = id => dispatch => {
  axios
    .delete(`/clients/${id}`)
    .then(res =>
      dispatch({
        type: GET_CLIENT,
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

// Client loading
export const setClientLoading = () => {
  return {
    type: CLIENT_LOADING
  };
};
