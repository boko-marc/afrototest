const express = require('express');
var router = express.Router();
const PostController = require("../Controllers/postController");
const isAdmin = require('../Middlewares/isAdmin');
const isAuthenticate = require('../Middlewares/isAuthenticate');
const { route } = require('./userRoute');


// the admin can create delete modify
// and retrieve any post but a logged in user can only retrieve his post

// user logged can create post
router.post('',[isAuthenticate],PostController.create)

// get one post by post id 
router.get('/:id',[isAuthenticate],PostController.getPost)

// user logged can delete her post
router.delete('/delete/:id',[isAuthenticate],PostController.deletePost)

// user logged can update her post
router.put('/update/:id',[isAuthenticate],PostController.updatePost)

// get all post created by user
router.get('/created/by',[isAuthenticate],PostController.getPostsByUserLogged)

// get all posts (only admin)
router.get('',[isAdmin],PostController.getAllPosts)


module.exports = router;