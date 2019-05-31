import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getAlerts } from '../../actions/alertActions';
import AlertItem from './AlertItem';

class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.client.id
    };
  }

  componentDidMount() {
    this.props.getAlerts(this.props.id);
  }
  render() {
    const { alerts, loading } = this.props.alert;

    let alertItems;

    if (alerts === null || undefined || loading) {
      alertItems = <Spinner />;
    } else {
      if (alerts.length > 0) {
        alertItems = alerts.map(alert => (
          <AlertItem key={alert._id} alert={alert} />
        ));
      } else {
        alertItems = <h4>No Alerts found</h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h5 className="display-4 text-center">Alerts</h5>
              <p className="lead text-center">Here are your client's alerts.</p>
              {alertItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Alerts.propTypes = {
  getAlerts: PropTypes.func.isRequired,
  alert: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert,
  client: state.client
});

export default connect(
  mapStateToProps,
  { getAlerts }
)(Alerts);
