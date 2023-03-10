const express = require('express');
const { getAllUsers, getUserId, search, formNewUser, postUser, userEdit, editConfirm, userDelete, deleteConfirm } = require('../controllers/userController');

const routerUser = express.Router();

// rutas para buscar usuarios
routerUser.get('/users', getAllUsers);
routerUser.get('/user/:id', getUserId);
routerUser.get('/search', search);
// rutas para agregar usuario
routerUser.get('/new-user', formNewUser);
routerUser.post('/new-user', postUser);
// rutas para editar usuarios
routerUser.get('/user-edit/:id', userEdit);
routerUser.put('/user-edit', editConfirm);
routerUser.get('/user-delete/:id', userDelete);
routerUser.delete('/user-delete', deleteConfirm);

module.exports = routerUser;