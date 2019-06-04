import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { updateAlert } from '../../actions/alertActions';

class CreateAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: '',
      currentPrice: '',
      alertPrice: '',
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

    const alertData = {
      stock: this.state.stock,
      currentPrice: this.state.currentPrice,
      alertPrice: this.state.alertPrice
    };
    this.props.updateAlert(this.props.match.params.id, alertData);
    this.props.history.goBack();
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
              <h1 className="display-4 text-center">Edit Alert</h1>
              <p className="lead text-center">
                Add an current alert to track your clients holdings.
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder={this.state.stock}
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
  errors: PropTypes.object.isRequired,
  updateAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateAlert }
)(withRouter(CreateAlert));
