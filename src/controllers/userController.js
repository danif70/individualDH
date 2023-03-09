const users = require('../database/users');
const path = require('path');

const getAllUsers = (req, res) => {
    // res.send(users)
    // con el res.render renderizamos la view y si es necesario se le pasa un parámetro, en este caso allUsers que es como está identificado en la view
    res.render(path.join(__dirname, '../views/users'), { 'allUsers': users })
};

const getUserId = (req, res) => {
    const { id } = req.params;
    const user = users.find(elem =>
        elem.id == parseInt(id)
    );
    if (user) {
        res.render(path.join(__dirname, '../views/userDetail'), { user })
    } else {
        res.send('not found')
    }
};

const search = (req, res) => {
    const { name } = req.query;
    const user = users.filter(elem => elem.name.toUpperCase().includes(name.toUpperCase()));
    console.log(user)
    user.length != 0 ? res.render(path.join(__dirname, '../views/userDetail'), { user }) : res.status(404);
};

const formNewUser = (req, res) => {
    res.render(path.join(__dirname, '../views/formNewUser'));
}

const postUser = (req, res) => {
    const {
        name,
        age,
        img,
    } = req.body;
    const newId = users[users.length - 1].id + 1;
    const obj = {
        id: newId,
        name,
        age,
        img,
    };
    users.push(obj);
    res.redirect('/users');
}

module.exports = {
    getAllUsers,
    getUserId,
    search,
    formNewUser,
    postUser,
};