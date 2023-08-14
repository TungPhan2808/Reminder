const cron = require('node-cron')
const moment = require('moment')
const Tasks = require('../models/Task')
const sendMail = require('../services/email')

const getTaskNow = async (req, res) => {
  const currentTime = moment().format('YYYY-MM-DD HH:mm:00')
  const tasks = await Tasks.find({
    time: currentTime,
    completed: false,
    isRemind: true,
  })
    .populate('user_id', 'name email')
    .exec()
  return tasks
}

const reminder = async () => {
  console.log('Schedule every minute')
  const tasks = await getTaskNow()
  if (!tasks.length) {
    console.log('No tasks to reminder')
    return
  }
  tasks.forEach(async task => {
    const {
      user_id: { email, name },
      todo,
      _id,
    } = task
    await sendMail({ email, name }, { todo })
    await Tasks.findByIdAndUpdate(_id, { completed: true, isRemind: false })
  })
}

module.exports = cron.schedule('* * * * *', () => {
  reminder()
})
