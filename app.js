const express = require('express');
const morgan = require('morgan');
const routerMain = require('./src/routes/main');
const routerUser = require('./src/routes/user');
// se instala method-override que permite modificar un método POST para poder usar PUT
const methodOverride = require('method-override');
const path = require('path');
const port = process.env.PORT || 3001;

const app = express();

app.set('view engine', 'ejs');
app.use(morgan('dev'));

// middleware que permite que la aplicación acceda a los archivos de la carpeta public
app.use(express.static('public'));

// middleware que permite que se envien datos por un formulario
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(routerMain);
app.use(routerUser);

app.use((req, res, next)=> {
    res.status(404).render(path.join(__dirname, './src/views/not-found'));
})

app.listen(port, () => console.log(`servidor escuchando puerto ${port}`));
