// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

const cors=require('cors');
const express = require('express');
const { getConnection } = require('./db/connect-mongo');

const app = express();
const port = process.env.PORT; // Usar solo el puerto de .env

app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Conectar a MongoDB
getConnection()
 
// Rutas
app.use('/director', require('./routes/director'));
app.use('/genero', require('./routes/genero'));
app.use('/tipo', require('./routes/tipo'));
app.use('/media', require('./routes/media'));
app.use('/productora', require('./routes/productora'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});