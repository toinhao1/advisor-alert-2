import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ClientItem extends Component {
  render() {
    const { client } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{client.name}</h3> <p>{client.identifier}</p>
            <Link to={`/clients/${client._id}`} className="btn btn-info">
              View Client
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ClientItem.propTypes = {
  client: PropTypes.object.isRequired
};

export default ClientItem;
