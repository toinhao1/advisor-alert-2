import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getCurrentAlert, deleteAlert } from '../../actions/alertActions';

class Alert extends Component {
  componentDidMount() {
    this.props.getCurrentAlert(this.props.match.params.id);
  }

  onDeleteCLick(id) {
    this.props.deleteAlert(id);
    this.props.history.goBack();
  }

  render() {
    const { alert } = this.props.alert;

    let alertContent;

    if (alert === null || undefined) {
      alertContent = <Spinner />;
    } else {
      alertContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <p> Current Price {alert.currentPrice}</p>
              <p>Alert Price {alert.alertPrice}</p>

              <Link to="/dashboard" className="btn btn-light mb-3 float-left">
                Back to all alerts.
              </Link>
              <button
                onClick={this.onDeleteCLick.bind(this, alert._id)}
                className="btn btn-danger"
              >
                Delete Alert
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
            <div className="col-md-12">{alertContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Alert.propTypes = {
  getCurrentAlert: PropTypes.func.isRequired,
  deleteAlert: PropTypes.func.isRequired,
  alert: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(
  mapStateToProps,
  { getCurrentAlert, deleteAlert }
)(Alert);
