const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'toinhao89@gmail.com',
    subject: 'Thanks for joining!',
    text: `Welcome to the app, ${name}. Let me know what you think of the app!`
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'toinhao89@gmail.com',
    subject: 'Sad to see you go!',
    text: `It's too bad your leaving, ${name}. What could we have done to kept you onboard?`
  });
};

module.exports = { sendWelcomeEmail, sendCancelEmail };
