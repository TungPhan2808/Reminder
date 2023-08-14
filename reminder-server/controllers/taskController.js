const Tasks = require('../models/Task')
const { StatusCodes } = require('http-status-codes')
const moment = require('moment')

const getAllTasks = async (req, res, next) => {
  const { _id } = req.user
  const { completed } = req.query
  let objectQuery = { user_id: _id }
  if (completed) {
    objectQuery = {
      ...objectQuery,
      completed,
    }
  }

  Tasks.find(objectQuery)
    .sort({ time: 1 })
    .exec()
    .then(
      tasks => {
        const tasksByDate = []
        // const today = moment().startOf('day')
        // const tomorrow = moment().add(1, 'day').startOf('day')
        tasks.forEach(task => {
          let taskDate = moment(task.time).format('DD-MM-YYYY')
          // const dateToCompare = moment(taskDate, 'DD-MM-YYYY')

          // if (dateToCompare.isSame(today, 'day')) {
          //   taskDate = `Today (${taskDate})`
          // }
          // if (dateToCompare.isSame(tomorrow, 'day')) {
          //   taskDate = `Tomorrow (${taskDate})`
          // }

          const existingIndex = tasksByDate.findIndex(
            day => day.date === taskDate
          )

          const taskFormattedTime = {
            ...task.toObject(),
            time: moment(task.time).format('HH:mm'),
          }
          if (existingIndex === -1) {
            tasksByDate.push({ date: taskDate, tasks: [taskFormattedTime] })
          } else {
            tasksByDate[existingIndex].tasks.push(taskFormattedTime)
          }
        })

        res
          .status(StatusCodes.OK)
          .json({ tasks: tasksByDate, count: tasks.length })
      },
      err => next(err)
    )
    .catch(err => next(err))
}

const createTask = async (req, res, next) => {
  Tasks.create(req.body)
    .then(
      task => {
        res.statusCode = StatusCodes.CREATED
        res.json(task)
      },
      err => next(err)
    )
    .catch(err => next(err))
}

const deleteTask = async (req, res, next) => {
  Tasks.deleteMany()
    .then(
      resp => {
        res.json(resp)
      },
      err => next(err)
    )
    .catch(err => next(err))
}

const getTaskById = async (req, res, next) => {
  Tasks.findById(req.params.taskId)
    .then(
      task => {
        res.statusCode = StatusCodes.OK
        res.json(task)
      },
      err => next(err)
    )
    .catch(err => next(err))
}

const updateTaskById = (req, res, next) => {
  Tasks.findByIdAndUpdate(
    { _id: req.params.taskId, user_id: req.user._id },
    req.body,
    { new: true, runValidators: true }
  )
    .then(
      dish => {
        if (!dish) {
          res.status(StatusCodes.NOT_FOUND).json({ msg: 'not found task' })
          return
        }
        res.statusCode = StatusCodes.OK
        res.json(dish)
      },
      err => next(err)
    )
    .catch(err => next(err))
}

const deleteTaskById = (req, res, next) => {
  Tasks.findByIdAndRemove({ _id: req.params.taskId, user_id: req.user._id })
    .then(
      resp => {
        res.statusCode = StatusCodes.OK
        res.json(resp)
      },
      err => next(err)
    )
    .catch(err => next(err))
}

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
}
