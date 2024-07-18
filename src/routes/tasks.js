const express = require('express');
const { getTasks, addTask, updateTask, deleteTask, searchTasks } = require('../controllers/taskController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/tasks', auth(), getTasks);
router.post('/tasks', auth(), addTask);
router.put('/tasks/:taskId', auth(), updateTask);
router.delete('/tasks/:taskId', auth(), deleteTask);
router.get('/tasks/search', auth(), searchTasks);

module.exports = router;
