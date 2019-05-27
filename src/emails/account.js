const sgMail = require('@sendgrid/mail');
const keys = require('../../config/keys');

sgMail.setApiKey(keys.SENDGRID_API_KEY);

const sendWelcomeEmail = async (email, name) => {
  try {
    await sgMail.send({
      to: email,
      from: 'toinhao89@gmail.com',
      subject: 'Thanks for joining!',
      text: `Welcome to the app, ${name}. Let me know what you think of the app!`
    });
  } catch (err) {
    console.log(err);
  }
};

const sendCancelEmail = async (email, name) => {
  try {
    sgMail.send({
      to: email,
      from: 'toinhao89@gmail.com',
      subject: 'Sad to see you go!',
      text: `It's too bad your leaving, ${name}. What could we have done to kept you onboard?`
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendWelcomeEmail, sendCancelEmail };
