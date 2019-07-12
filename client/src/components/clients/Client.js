import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getCurrentClient, deleteClient } from '../../actions/clientActions';
import { getAlerts } from '../../actions/alertActions';
import AlertItem from '../alerts/AlertItem';

class Client extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getCurrentClient(this.props.match.params.id);
      this.props.getAlerts(this.props.match.params.id);
    }
  }

  onDeleteCLick(id) {
    this.props.deleteClient(id);
    this.props.history.push('/dashboard');
  }
  render() {
    const { client, loading } = this.props.client;

    const { alerts } = this.props.alert;

    let clientContent;

    let alertItems = alerts.map(alert => (
      <AlertItem key={alert._id} alert={alert} />
    ));

    if (client === null || loading) {
      clientContent = <Spinner />;
    } else {
      clientContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h4>Client: {client.name}</h4>
              <p>Identifier: {client.identifier}</p>
              {alertItems}
              <Link to="/dashboard" className="btn btn-light mb-3 float-left">
                Back to all clients
              </Link>
              <Link to="/create-alert" className="btn btn-info mb-3 float-left">
                Create A New Alert
              </Link>
              <button
                onClick={this.onDeleteCLick.bind(this, client._id)}
                className="btn btn-danger"
              >
                Delete Client
              </button>
            </div>
            <div className="col-md-6" />
          </div>
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{clientContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Client.propTypes = {
  getCurrentClient: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  alert: PropTypes.object.isRequired,
  getAlerts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  client: state.client,
  alert: state.alert
});

export default connect(
  mapStateToProps,
  { getCurrentClient, deleteClient, getAlerts }
)(Client);
