import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import './App.css';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Client from './components/clients/Client';
import CreateClient from './components/clients/CreateClient';
import Alert from './components/alerts/Alert';
import CreateAlert from './components/alerts/CreateAlert';

// Check for token
if (localStorage.jwttoken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwttoken);
  // Decode token and get user data
  const decoded = jwt_decode(localStorage.jwttoken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser());
    // // TODO: Clear current profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="cont">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/clients/:id" component={Client} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/alerts/:id" component={Alert} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-client"
                  component={CreateClient}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-alert"
                  component={CreateAlert}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
