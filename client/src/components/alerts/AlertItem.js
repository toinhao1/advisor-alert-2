import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlertItem extends Component {
  render() {
    const { alert } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-lg-6 col-md-4 col-8">
            <h3>Stock {alert.stock}</h3>
            <p>Current Price {alert.currentPrice}</p>
            <p>Alert Price {alert.alertPrice}</p>
            <Link to={`/alerts/${alert._id}`} className="btn btn-info">
              View Alert
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

AlertItem.propTypes = {
  alert: PropTypes.object.isRequired
};

export default AlertItem;
