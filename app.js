const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'frontend')));

// Importar rutas
const personasRoutes = require('./src/routes/personasRoutes');
const encuestasRoutes = require('./src/routes/encuestasRoutes');
const preguntasRoutes = require('./src/routes/preguntasRoutes');
const opcionesRoutes = require('./src/routes/opcionesRoutes');
const respuestasRoutes = require('./src/routes/respuestasRoutes');

// Usar las rutas
app.use('/personas', personasRoutes);
app.use('/encuestas', encuestasRoutes);
app.use('/preguntas', preguntasRoutes);
app.use('/opciones', opcionesRoutes);
app.use('/respuestas', respuestasRoutes);

app.listen(3000, () => {
    console.log('Escuchando en el servidor http://localhost:3000');
});
