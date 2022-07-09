# AFROTO TEST API
This project consists in creating an API in Express js \Nest js.
## Installation
Install the dependencies and devDependencies and start the server
This API requires [Node.js](https://nodejs.org/) v10+ to run

git clone https://github.com/boko-marc/afrototest.git
or git clone git@github.com:boko-marc/afrototest.git
```sh
git clone https://github.com/boko-marc/afrototest.git
or git clone git@github.com:boko-marc/afrototest.git
npm install
cd afrototest
cp .example.env .env
CREATE new Mongodb Database and change url in .env file
MONGO_DB_URI = url_for_new_mongodb_database


npm run dev
```
## Admin account informations
email : admin@gmail.com,
password: 123456789

## User model
-name
-email
-password
-bio
-birthdate
-role

## Post model
-title
-message
-author

- ✨Magic ✨

## Features
Admin has full access to all API routes
Only a logged in user can create-edit-delete their account and posts
## users routes
// create user account 
http://localhost:8000/api/v1/user/register
method: POST
body: name,email,bio,password,birthdate

// login
http://localhost:8000/api/v1/user/login
method: POST
body: email,password

// admin and user logged can get user account
http://localhost:8000/api/v1/user/userId
method: GET
Authorization: Bearer Token : token
token :  token after logged 
userId: the id of the user whose account wants to be recovered


// admin and user logged can update user account
http://localhost:8000/api/v1/user/update/userId
method: PUT
Authorization: Bearer Token : token
token :  token after logged 
userId: the id of the user whose account wants to be recovered

// Only admin can get all users
http://localhost:8000/api/v1/user
method: GET
Authorization: Bearer Token : token
token :  token after logged 

// user can delete her account when is logged and admin can delete all user account 
http://localhost:8000/api/v1/user/delete/userId
method: DELETE

Authorization: Bearer Token : token
token :  token after logged 
userId: the id of the user whose account wants to be recovered

## Posts routes
// admin can acces all routes

// user logged can create post 
http://localhost:8000/api/v1/post
method: POST


// get one post by post id 
http://localhost:8000/api/v1/post/postId?author=userId
method: GET
Authorization: Bearer Token : token
token :  token after logged 
userId: user id who want to recovered post
postId: the post id whose wants to be recovered

// user logged can delete her post
http://localhost:8000/api/v1/post/delete/postId?author=userId
method: DELETE
Authorization: Bearer Token : token
token :  token after logged 
userId: user id who want to delete post
postId: the post id whose wants to be delete

// user logged can update her post
http://localhost:8000/api/v1/post/update/postId?author=userId
method: PUT
Authorization: Bearer Token : token
token :  token after logged 
userId: user id who want to update post
postId: the post id whose wants to be update

// get all post created by user
http://localhost:8000/api/v1/post/created/by?author=userId
method: PUT
Authorization: Bearer Token : token
token :  token after logged 
userId: user id who want to recovered post created

// get all posts (only admin)
http://localhost:8000/api/v1/post
method: GET
Authorization: Bearer Token : token
token :  token after logged 

## Tech
- [Mongodb] - Database
- [Node.js] 
- [Express.js]
