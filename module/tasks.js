const mongoose = require('mongoose')
const Tasks = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must be entered']
    },
    dueDate: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('tasks', Tasks)