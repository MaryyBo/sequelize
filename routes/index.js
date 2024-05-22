const { Router } = require('express');
const UserController = require('../controllers/User.controller')
const TaskController = require ('../controllers/Task.controller')

const router = Router();

// POST http://localhost:5000/api/user
router.post('/user', UserController.createUser);

// GET http://localhost:5000/api/users
router.get('/users', UserController.findAll);

// GET http://localhost:5000/api/user/24
router.get('/user/:id', UserController.findByPk);

//DELETE http://localhost:5000/api/user/24
router.delete('/user/:id', UserController.deleteByPk);

//PUT ttp://localhost:5000/api/user/24
router.put('/user/:id', UserController.updateUser
);



// POST http://localhost:5000/api/task/25
router.post('/task/:userId', TaskController.createTask);

// GET http://localhost:5000/api/tasks/2
router.get('/tasks/:userId', TaskController.getAllUserTasks);

// GET http://localhost:5000/api/tasks-count/2
router.get('/tasks-count/:userId', TaskController.getCountOfTasks);






// router.get('/user');

module.exports = router;