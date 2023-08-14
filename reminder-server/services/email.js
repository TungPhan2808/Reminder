const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_SENDER,
    pass: process.env.MAIL_APP_PASSWORD,
  },
})

const mailOptions = {
  from: process.env.MAIL_SENDER,
  subject: 'Reminder Notification',
}

const sendMail = async (user, task) => {
  mailOptions.to = user.email
  mailOptions.text = `Dear ${user.name},

This mail is sent to you to notify the task that you have created:

- ${task.todo}

When you finish the task, please kindly mark the task as completed on the reminder.

Regards,
Reminder App.`

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info.response)
    }
  })
}

module.exports = sendMail
