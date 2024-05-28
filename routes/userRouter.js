// USER routes section


const { Router } = require('express');
const UserController = require('../controllers/User.controller');
const { getUserInstance, validateUser } = require('../middlewares/user.mw');
const pagination = require ('../middlewares/pagination.mw');

const userRouter = Router()

// POST http://localhost:5000/api/users
userRouter.post('/', validateUser, UserController.createUser);
// GET http://localhost:5000/api/users
userRouter.get('/', pagination, UserController.findAll);
// GET http://localhost:5000/api/users/25
userRouter.get('/:userId', getUserInstance, UserController.findByPk);
// GET http://localhost:5000/api/users/groups/userId
userRouter.get('/groups/:userId', UserController.getUserWithGroups);
// DELETE http://localhost:5000/api/users/25
userRouter.delete('/:userId', UserController.deleteByPk);
// PUT http://localhost:5000/api/users/25
userRouter.put('/:userId', getUserInstance, UserController.updateUser);

module.exports = userRouter;