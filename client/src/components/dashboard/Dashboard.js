import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount } from '../../actions/authActions';
import { getClients } from '../../actions/clientActions';
import Spinner from '../common/Spinner';
import Clients from '../clients/Clients';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getClients();
  }
  onDeleteCLick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { clients, loading } = this.props.client;

    let dashboardContent;

    if (clients === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has any clients
      if (Object.keys(clients).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <Clients />
            <div style={{ marginBottom: '60px' }} />
            <Link to="/create-client" className="btn btn-lg btn-info">
              Create A Client
            </Link>
            <button
              onClick={this.onDeleteCLick.bind(this)}
              className="btn btn-danger"
            >
              Delete Account
            </button>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not added any of your clients yet.</p>
            <Link to="/create-client" className="btn btn-lg btn-info">
              Create A Client
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getClients: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  client: state.client,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteAccount, getClients }
)(Dashboard);
