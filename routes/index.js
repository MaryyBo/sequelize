const { Router } = require('express');
const UserController = require('../controllers/User.controller')

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



// router.get('/user');

module.exports = router;