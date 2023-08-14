const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user id'],
    },
    todo: {
      type: String,
      required: [true, 'Please provide todo'],
    },
    time: {
      type: Date,
      required: [true, 'Please provide time'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    isRemind: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Tasks = mongoose.model('Task', taskSchema)
module.exports = Tasks
