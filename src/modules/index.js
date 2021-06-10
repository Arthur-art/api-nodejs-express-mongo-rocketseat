const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e347708221a345",
      pass: "e2649f5bd4f4d2"
    }
  });

module.exports = transport;