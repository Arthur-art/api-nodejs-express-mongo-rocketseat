const path = require('path')
const nodemailer = require('nodemailer');
const {host, port, user, pass} = require('../config/mail.json')
const hbs = require('nodemailer-express-handlebars')

var transport = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass
    }
  });

transport.use('compile', hbs({
  viewEngine: 'handlebars',
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html',
}));

module.exports = transport;