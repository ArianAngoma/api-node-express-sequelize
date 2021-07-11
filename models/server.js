const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');

const {dbConnection} = require('../database/config');
require('../database/associations');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            users: '/api/users',
            roles: '/api/roles',
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            uploads: '/api/uploads'
        }

        // Conección a la base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    async connectDB() {
        try {
            await dbConnection.sync();
            console.log('La conexión se ha establecido correctamente.');
        } catch (error) {
            console.error('No se puede conectar a la base de datos: ', error);
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Morgan
        this.app.use(morgan('dev'));

        // Habilitar body-parser para leer datos del formulario
        this.app.use(express.urlencoded({extended: true}));

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));

        // Añadir carpetas de vistas
        this.app.set('views', path.join(__dirname, '../views'));

        // FileUpload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.path.users, require('../routes/users'));
        this.app.use(this.path.roles, require('../routes/roles'));
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.categories, require('../routes/categories'));
        this.app.use(this.path.products, require('../routes/products'));
        this.app.use(this.path.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;