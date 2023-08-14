const express = require('express')
const router = express.Router()
const Tasks = require('../models/Task')
const { StatusCodes } = require('http-status-codes')
const textToTask = require('../services/langchainService')

router
  .route('/')
  .get((req, res, next) => {
    res.statusCode = StatusCodes.METHOD_NOT_ALLOWED
    res.json('GET request not supported')
  })
  .post(async (req, res, next) => {
    const receivedText = req.body.receivedText
    try {
      const resp = await textToTask(receivedText)
      const { _id } = req.user
      const tasks = resp.text
      tasks.forEach(element => {
        element.user_id = _id
      });
      const result = await Tasks.insertMany(tasks)
      res.statusCode = StatusCodes.CREATED
      res.json(result)
    } catch (error) {
      next(error)
    }
  })
  .put((req, res, next) => {
    res.statusCode = StatusCodes.METHOD_NOT_ALLOWED
    res.json('PUT request not supported')
  })
  .delete((req, res, next) => {
    res.statusCode = StatusCodes.METHOD_NOT_ALLOWED
    res.json('DELETE request not supported')
  })

module.exports = router
