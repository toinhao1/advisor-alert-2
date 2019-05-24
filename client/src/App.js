import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import './App.css';

import { Provider } from 'react-redux';
import store from './store';

import Landing from './components/layout/Landing';

// // Check for token
// if (localStorage.jwttoken) {
//   // Set auth token header auth
//   setAuthToken(localStorage.jwttoken);
//   // Decode token and get user data
//   const decoded = jwt_decode(localStorage.jwttoken);
//   // Set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded));

//   // Check for expired token
//   const currentTime = Date.now() / 1000;
//   if (decoded.exp < currentTime) {
//     // Logout User
//     store.dispatch(logoutUser());
//     // // TODO: Clear current profile
//     // store.dispatch(clearCurrentProfile());
//     // Redirect to login
//     window.location.href = '/login';
//   }
// }

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
