const express = require('express');
const { getAllUsers, getUserId, search, formNewUser,
    postUser } = require('../controllers/userController');

const routerUser = express.Router();


routerUser.get('/users', getAllUsers);
routerUser.get('/user/:id', getUserId);
routerUser.get('/search', search);
routerUser.get('/new-user', formNewUser);
routerUser.post('/new-user', postUser);

module.exports = routerUser;