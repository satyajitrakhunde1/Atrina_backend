const Task = require('../models/Task');

const getTasks = async (req, res) => {
    try {
        const tasks = req.user.role === 'Admin'
            ? await Task.find()
            : await Task.find({ author: req.user._id });
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
};

const addTask = async (req, res) => {
    try {
        const task = new Task({ ...req.body, author: req.user._id });
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
};

const updateTask = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        let task = await Task.findOne({ _id: req.params.taskId, author: req.user._id });

        if (!task && req.user.role !== 'Admin') {
            return res.status(404).send();
        }

        if (req.user.role === 'Admin') {
            task = await Task.findById(req.params.taskId);
            if (!task) {
                return res.status(404).send();
            }
        }

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
};


const deleteTask = async (req, res) => {
    try {
        let task = await Task.findOneAndDelete({ _id: req.params.taskId, author: req.user._id });

        if (!task && req.user.role !== 'Admin') {
            return res.status(404).send({ error: 'Task not found.' });
        }

        if (req.user.role === 'Admin' && !task) {
            task = await Task.findByIdAndDelete(req.params.taskId);
            if (!task) {
                return res.status(404).send({ error: 'Task not found.' });
            }
        }

        res.send({ message: 'Task deleted successfully.' });
    } catch (error) {
        res.status(500).send(error);
    }
};




const searchTasks = async (req, res) => {
    try {
        const { name, author } = req.query;
        let query = req.user.role === 'Admin' ? {} : { author: req.user._id };

        if (name) {
            query.title = new RegExp(name, 'i');
        }
        if (author && req.user.role === 'Admin') {
            // Find the user by username to get their ObjectId
            const user = await User.findOne({ username: author });
            if (user) {
                query.author = user._id; // Assign the ObjectId of the user
            } else {
                // If user with the provided username doesn't exist
                return res.status(404).send({ message: 'User not found.' });
            }
        }

        const tasks = await Task.find(query);

        if (tasks.length === 0) {
            return res.status(404).send({ message: 'No tasks found.' });
        }

        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
};




module.exports = { getTasks, addTask, updateTask, deleteTask, searchTasks };
