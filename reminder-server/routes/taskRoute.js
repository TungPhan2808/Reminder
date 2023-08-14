const express = require('express')
const taskRouter = express.Router()
const Tasks = require('../models/Task')

const {
  getAllTasks,
  createTask,
  deleteTask,
  deleteTaskById,
  getTaskById,
  updateTaskById,
} = require('../controllers/taskController')

taskRouter.route('/').get(getAllTasks).post(createTask).delete(deleteTask)

taskRouter
  .route('/:taskId')
  .get(getTaskById)
  .patch(updateTaskById)
  .delete(deleteTaskById)
module.exports = taskRouter
