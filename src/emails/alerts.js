const sgMail = require('@sendgrid/mail');
const keys = require('../../config/keys');

sgMail.setApiKey(keys.SENDGRID_API_KEY);

const sendNewAlertEmail = async (user, alert) => {
  try {
    await sgMail.send({
      to: user.email,
      from: 'toinhao89@gmail.com',
      subject: 'New alert set up!',
      text: `Your new alert for ticker: ${alert.stock} has been set up. The current price is: $${alert.currentPrice} and you will receive an alert when the price hits: $${alert.alertPrice}`
    });
  } catch (err) {
    console.log(err);
  }
};


module.exports = { sendNewAlertEmail }