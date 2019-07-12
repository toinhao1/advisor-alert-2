import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { createAlert } from '../../actions/alertActions';

class CreateAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: '',
      currentPrice: '',
      alertPrice: '',
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const alertData = {
      stock: this.state.stock,
      currentPrice: this.state.currentPrice,
      alertPrice: this.state.alertPrice
    };
    const { client } = this.props.client;
    this.props.createAlert(client._id, alertData);
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create An Alert</h1>
              <p className="lead text-center">
                Add an alert to track your clients holdings.
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Stock"
                  name="stock"
                  value={this.state.stock}
                  onChange={this.onChange}
                  error={errors.stock}
                  info="The stock ticker for this holding."
                />
                <TextFieldGroup
                  placeholder="* Current Price"
                  name="currentPrice"
                  value={this.state.currentPrice}
                  onChange={this.onChange}
                  error={errors.currentPrice}
                  info="The current price of the holding."
                />
                <TextFieldGroup
                  placeholder="* Alert Price"
                  name="alertPrice"
                  value={this.state.alertPrice}
                  onChange={this.onChange}
                  error={errors.alertPrice}
                  info="What price would you like to be notified when the holding hits?."
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

CreateAlert.propTypes = {
  alert: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert,
  client: state.client,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createAlert }
)(withRouter(CreateAlert));
