// TASK routes section

const { Router } = require('express');
const { validateTask } = require('../middlewares/task.mw');
const { getUserInstance } = require('../middlewares/user.mw');
const TaskController = require('../controllers/Task.controller');

const taskRouter = Router();

// POST http://localhost:5000/api/tasks/25
taskRouter.post('/:userId', validateTask, getUserInstance, TaskController.createTask);
// GET http://localhost:5000/api/tasks/25
taskRouter.get('/:userId', getUserInstance, TaskController.getAllUserTasks);
// GET http://localhost:5000/api/tasks/count/:userId
taskRouter.get('/count/:userId', getUserInstance, TaskController.getCountOfTasks);

module.exports = taskRouter;