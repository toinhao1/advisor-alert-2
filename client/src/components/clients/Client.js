import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getCurrentClient, deleteClient } from '../../actions/clientActions';

class Client extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getCurrentClient(this.props.match.params.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.client.client === null && this.props.client.loading) {
      this.props.history.push('/not-found');
    }
  }
  onDeleteCLick(e) {
    this.props.deleteClient(e);
  }
  render() {
    const { client, loading } = this.props.client;
    let clientContent;

    if (client === null || loading) {
      clientContent = <Spinner />;
    } else {
      clientContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h4>{client.name}</h4>
              <p>{client.identifier}</p>
              <Link to="/dashboard" className="btn btn-light mb-3 float-left">
                Back to all clients.
              </Link>
              <button
                onClick={this.onDeleteCLick.bind(this)}
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
  client: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  client: state.client
});

export default connect(
  mapStateToProps,
  { getCurrentClient, deleteClient }
)(Client);
