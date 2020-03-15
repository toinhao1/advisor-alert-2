import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { updateAlert, getCurrentAlert } from '../../actions/alertActions';
import { getPriceData } from '../../actions/dataAPIActions'
import Spinner from '../../components/common/Spinner'

class UpdateAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: '',
      alertPrice: '',
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentAlert(this.props.match.params.id)
  }

  componentDidUpdate(oldProps) {
    const { alert, match } = this.props
    console.log(match.params.id !== oldProps.alert._id, oldProps)
    if (match.params.id !== oldProps.alert._id) {
      this.props.getCurrentAlert(this.props.match.params.id)
      this.setState({
        currentPrice: alert.currentPrice,
        alertPrice: alert.alertPrice
      }, () => console.log(this.state))
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const alertData = {
      stock: this.props.alert.stock,
      currentPrice: this.props.alert.currentPrice,
      alertPrice: this.state.alertPrice
    };
    this.props.updateAlert(this.props.match.params.id, alertData);
    this.props.history.goBack();
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const { alert } = this.props
    if (alert !== null) {
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
                    name="stock"
                    value={alert.stock}
                    error={errors.stock}
                    disabled={true}
                    info="The stock ticker for this holding."
                  />
                  <TextFieldGroup
                    name="currentPrice"
                    value={alert.currentPrice}
                    disabled={true}
                    error={errors.currentPrice}
                    info="The current price of the holding."
                  />
                  <TextFieldGroup
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
    } else {
      return <div><Spinner /></div>
    }

  }
}

UpdateAlert.propTypes = {
  errors: PropTypes.object.isRequired,
  updateAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert.alert,
  price: state.data.price,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateAlert, getCurrentAlert, getPriceData }
)(withRouter(UpdateAlert));
