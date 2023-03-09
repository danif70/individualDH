const express = require('express');
const { index, about } = require('../controllers/mainController');

const routerMain = express.Router();


routerMain.get('/', index);

routerMain.get('/about', about);


module.exports = routerMain;