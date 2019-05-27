import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getClients } from '../../actions/clientActions';
import ClientItem from './ClientItem';

class Clients extends Component {
  componentDidMount() {
    this.props.getClients();
  }
  render() {
    const { clients, loading } = this.props.client;

    let clientItems;

    if (clients === null || loading) {
      clientItems = <Spinner />;
    } else {
      if (clients.length > 0) {
        clientItems = clients.map(client => (
          <ClientItem key={client._id} client={client} />
        ));
      } else {
        clientItems = <h4>No clients found</h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Clients</h1>
              <p className="lead text-center">Here are your clients</p>
              {clientItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Clients.propTypes = {
  getClients: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  client: state.client
});

export default connect(
  mapStateToProps,
  { getClients }
)(Clients);
