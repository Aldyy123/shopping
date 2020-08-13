const nodemailer = require('nodemailer');

module.exports = {
    async sendMailRegister(payload, token) {
      const config = {
        port : 7777,
        secure : false,
        proxy: 'http://192.168.43.32:44355',
        service: 'gmail',
        auth: {
          user: 'bocah.ngik@gmail.com',
          pass: 'proggramer'
        }
      };
      
      const transporter = await nodemailer.createTransport(config);
      const mail = {
        to: payload.email,
        from: 'node-email@gmail.com',
        subject: '[Node Email] - Success Registration',
        html: `<h4>127.0.0.1:4000/verify/user?token=${token}</h4>`
      };
      const info =  await transporter.sendMail(mail)
      return info
    },
  };