const Task = require('../module/tasks'); // capitalize for clarity
const User = require('../module/user');


// ---------------- GET ALL TASKS FOR LOGGED-IN USER ----------------
const getAllLists = async(req, res) => {
    try {
        // req.user.userId comes from auth middleware decoding the token
        const allTasks = await Task.find({ createdBy: req.user.userId }).sort('createdAt');
        res.status(200).json(allTasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error fetching tasks' });
    }
};

// ---------------- GET SINGLE TASK ----------------
const getSingleList = async(req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOne({ _id: taskID, createdBy: req.user.userId }); // only allow access if createdBy matches

        if (!task) return res.status(404).json({ msg: 'Task not found' });

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error fetching task' });
    }
};

// ---------------- CREATE TASK ----------------
const createList = async(req, res) => {
    try {
        // Attach the logged-in user's ID
        req.body.createdBy = req.user.userId;

        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error creating task' });
    }
};

// ---------------- DELETE ALL TASKS (OPTIONAL, CAUTION) ----------------
const deleteAllList = async(req, res) => {
    try {
        // Only delete tasks for the logged-in user
        const result = await Task.deleteMany({ createdBy: req.user.userId });
        res.status(200).json({ deletedCount: result.deletedCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error deleting tasks' });
    }
};

// ---------------- DELETE SINGLE TASK ----------------
const deleteList = async(req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID, createdBy: req.user.userId });

        if (!task) return res.status(404).json({ msg: 'Task not found or not yours' });

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error deleting task' });
    }
};

// ---------------- UPDATE TASK ----------------
const updateList = async(req, res) => {
    try {
        const { name, dueDate } = req.body;
        const { id: taskID } = req.params;

        const task = await Task.findOneAndUpdate({ _id: taskID, createdBy: req.user.userId }, // only update own task
            { name, dueDate }, { new: true, runValidators: true }
        );

        if (!task) return res.status(404).json({ msg: 'Task not found or not yours' });

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error updating task' });
    }
};

module.exports = {
    getAllLists,
    getSingleList,
    createList,
    deleteList,
    deleteAllList,
    updateList
};