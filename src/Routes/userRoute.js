const express = require('express');
var router = express.Router();
const UserController = require("../Controllers/userController");
const isAdmin = require('../Middlewares/isAdmin');
const isAuthenticate = require('../Middlewares/isAuthenticate')
// create user account 
router.post('/register',UserController.register)
// login
router.post('/login', UserController.login);

// admin and user logged can get user account
router.get('/:id',[isAuthenticate],UserController.getUser)

// admin and user logged can update user account
router.put('/update/:id',[isAuthenticate],UserController.updateUser)

// Only admin can get all users
router.get('',[isAdmin],UserController.getAllUsers)

// user can delete her account when is logged and admin can delete all user account 
router.delete('/delete/:id',[isAuthenticate],UserController.deleteUser)

module.exports = router;