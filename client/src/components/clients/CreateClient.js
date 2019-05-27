import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { createClient } from '../../actions/clientActions';

class CreateClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      identifier: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const clientData = {
      name: this.state.name,
      identifier: this.state.identifier
    };
    this.props.createClient(clientData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create A Client</h1>
              <p className="lead text-center">
                Add a client so you can set alerts up for them.
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Client Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  info="A name for your client."
                />
                <TextFieldGroup
                  placeholder="* Client Identifier"
                  name="identifier"
                  value={this.state.identifier}
                  onChange={this.onChange}
                  error={errors.identifier}
                  info="Something unique about this client."
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-blocks mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateClient.propTypes = {
  client: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  client: state.client,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createClient }
)(withRouter(CreateClient));
