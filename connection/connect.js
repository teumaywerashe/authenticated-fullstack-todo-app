const tasks = require('../module/tasks')

const getAllLists = async(req, res) => {
    try {
        const allTask = await tasks.find()
        res.status(200).json(allTask)
    } catch (error) {
        res.status(404).send('error')
    }

}
const getSingleList = async(req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await tasks.findOne({ _id: taskID })
        res.status(200).json(task)
    } catch (error) {
        res.status(404).send('error')
    }

}

const createList = async(req, res) => {
    try {
        const task = await tasks.create(req.body)
        res.status(200).json(task)
    } catch (error) {
        res.status(404).send('error')
    }

}
const deleteAllList = async(req, res) => {
    try {
        const task = await tasks.deleteMany()
        res.status(200).json(task)
    } catch (error) {
        console.log(error);
    }

}
const deleteList = async(req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await tasks.findByIdAndDelete(taskID)
        if (!task) {
            res.status(200).json({ message: 'no task with this id' })
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(404).send('error')
    }

}
const updateList = async(req, res) => {
    try {
        const { name, dueDate } = req.body
        const { id: taskID } = req.params
        const task = await tasks.findByIdAndUpdate(taskID, {
            name: name,
            dueDate: dueDate
        })
        res.status(200).json(task)
    } catch (error) {
        res.status(404).send('error')
    }

}
module.exports = { getAllLists, createList, getSingleList, deleteList, deleteAllList, updateList }