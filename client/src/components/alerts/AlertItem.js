import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { deleteAlert } from '../../actions/alertActions';

class AlertItem extends Component {
  onDeleteCLick(id) {
    this.props.deleteAlert(id);
  }

  render() {
    const { alert } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-lg-6 col-md-4 col-8">
            <h3>Stock: {alert.stock}</h3>
            <p>Current Price: {alert.currentPrice}</p>
            <p>Alert Price: {alert.alertPrice}</p>
            <Link to={`/update-alert/${alert._id}`} className="btn btn-info">
              Edit Alert
            </Link>
            <button
              onClick={this.onDeleteCLick.bind(this, alert._id)}
              className="btn btn-danger"
            >
              Delete Alert
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteAlert }
)(AlertItem);
