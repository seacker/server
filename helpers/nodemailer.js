const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: `fancytodooomailer@gmail.com`,
      pass: process.env.PASSWORD_EMAIL
  }
})

function sendEmail(to, subject, body) {
  let mailOptions = {
    from: 'seacker@mail.com',
    to: to,
    subject: subject,
    html: body
  }

  transporter.sendMail(mailOptions, function (error, success) {
    if (error) {
      console.log(error);

    } else {
      console.log(success);

    }
  })
}

module.exports = sendEmail
