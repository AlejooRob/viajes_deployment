import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';

const app = express();

//Conectar la base de datos
db.authenticate()
    .then( () => console.log('Database connected'))
    .catch( error => console.log(error));

//Definir puerto y host
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

//HabilitarPUG
app.set('view engine', 'pug');

//Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.sitename = "Agencia de Viajes";
    next();
});

//Agregar body parser para leer datos
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica
app.use(express.static('public'));

//Agregar router
app.use('/', router);



app.listen(port, host, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})