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
    // recordar que los datos de un form se reciben a través de req.body
    const {
        name,
        age,
    } = req.body;
    const newId = users[users.length - 1].id + 1;
    // ahora la img será un file y se recibe por req.file
    const image = req.file ? req.file.filename : '';
    let newImage;
    if (image.length > 0){
        newImage = `images/usuarios/${image}`
    }
    const obj = {
        id: newId,
        name,
        age,
        img: newImage,
    };
    users.push(obj);
    res.redirect('/users');
}

const userEdit = (req, res) => {
    const { id } = req.params;
    const userEdit = users.find(elem => elem.id == id);
    res.render(path.join(__dirname, '../views/userEdit'), { userEdit })
}

const editConfirm = (req, res) => {
    // recordar que los datos de un form se reciben a través de req.body
    users.forEach(elem => {
        if (elem.id == req.body.id) {
            elem.name = req.body.name;
            elem.age = req.body.age;
            elem.img = req.body.img;
        }
    })
    res.redirect('/users')
}
const userDelete = (req, res) => {
    const { id } = req.params;
    const userDelete = users.find(elem => elem.id == id);
    res.render(path.join(__dirname, '../views/userDelete'), { userDelete })
}

const deleteConfirm = (req, res) => {
    // recordar que los datos de un form se reciben a través de req.body
    users.forEach(elem => {
        if (elem.id == req.body.id) {
            const indexDelete = users[elem.id - 1]
            users.splice((indexDelete.id - 1), 1)
        }
    })
    res.redirect('/users')
}

module.exports = {
    getAllUsers,
    getUserId,
    search,
    formNewUser,
    postUser,
    userEdit,
    editConfirm,
    userDelete,
    deleteConfirm,
};