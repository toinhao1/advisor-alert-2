import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import clientReducer from './clientReducer';
import alertReducer from './alertReducer';
import dataReducerAPI from './dataReducerAPI'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  client: clientReducer,
  alert: alertReducer,
  data: dataReducerAPI,
});
