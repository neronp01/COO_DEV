
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey("asGhMWa_TgahMiZuC3DRKg");




admin.initializeApp(functions.config().firebase);

const stripe = require('stripe')(functions.config().stripe.testkey)

exports.stripeCharge = functions.database
  .ref('/payments/{userId}/{paymentId}')
  .onWrite(event => {
    const payment = event.data.val();
    const userId = event.params.userId;
    const paymentId = event.params.paymentId;


    // checks if payment exists or if it has already been charged
    if (!payment || payment.charge) return;

    return admin.database()
      .ref(`/users/${userId}`)
      .once('value')
      .then(snapshot => {
        return snapshot.val();
      })
      .then(customer => {

        const amount = payment.amount;
        const idempotency_key = paymentId;  // prevent duplicate charges
        const source = payment.token.id;
        const currency = 'usd';
        const charge = {amount, currency, source};
        return stripe.charges.create(charge, { idempotency_key });

      })
      .then(charge => {
        admin.database()
          .ref(`/payments/${userId}/${paymentId}/charge`)
          .set(charge)
      })
  });



function parseBody(body) {
  var helper = sendgrid.mail;
  var fromEmail = new helper.Email(body.from);
  var toEmail = new helper.Email(body.to);
  var subject = body.subject;
  var content = new helper.Content('text/html', body.content);
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);
  return  mail.toJSON();
}

exports.MyFunction = functions.https.onRequest((req, res) => {
  res.send('my function');
});
exports.httpEmail = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    const error = new Error('Only POST requests are accepted');
    error.code = 405;
    throw error;
  }
  sendgrid.send({
    to:"neronpascal001@gmail.com",
    from:"neronpascal001@gmail.com",
    subject:"test",
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  });
  res.send("testFini");

});
