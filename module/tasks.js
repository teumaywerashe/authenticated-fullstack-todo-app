const mongoose = require('mongoose')
const Tasks = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must be entered']
    },
    dueDate: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
}, { timestamps: true })
module.exports = mongoose.model('tasks', Tasks)