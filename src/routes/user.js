const express = require('express');
const { 
    getAllUsers, 
    getUserId, 
    search, 
    formNewUser, 
    postUser, 
    userEdit, 
    editConfirm, 
    userDelete, 
    deleteConfirm, 
    admin 
} = require('../controllers/userController');
const routerUser = express.Router();
const isAdmin = require('../middlewares/adminMiddleware');
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');
const validateForm = [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('age').notEmpty().withMessage('La edad es requerida'),
]
// configuraciones de multer
const storage = multer.diskStorage({
    // destination es una función que determina el destino donde se guardarán los archivos que se suban
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/usuarios'))
    },
    // filename es la función que 'arma' el nombre con el que se guardará el archivo
    filename: (req, file, cb) => {
        // const newFile = "user-" + Date.now()+ "_img" + path.extname(file.originalname)
        const newFile = `user-${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, newFile);
    },
})
const upload = multer({ storage }); // instancia (inicio) de multer, se le pasa el storage
// rutas para buscar usuarios
routerUser.get('/users', getAllUsers);
routerUser.get('/user/:id', getUserId);
routerUser.get('/search', search);

// rutas para agregar usuario
routerUser.get('/new-user', formNewUser);
routerUser.post('/new-user', upload.single('img'), validateForm, postUser);

// rutas para editar usuarios
routerUser.get('/user-edit/:id', userEdit);
routerUser.put('/user-edit',validateForm, editConfirm);

// rutas para eliminar usuarios
routerUser.get('/user-delete/:id', userDelete);
routerUser.delete('/user-delete', deleteConfirm);

routerUser.get('/admin',isAdmin, admin)

module.exports = routerUser;