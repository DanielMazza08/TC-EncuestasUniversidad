const express = require('express');
const router = express.Router();
const preguntasController = require('../controllers/preguntasController');
const preguntaMiddleware = require('../middlewares/preguntas.middleware');
const schemaMiddleware = require('../middlewares/schema.middleware');
const preguntaSchema = require('../schemas/pregunta.schema');

router.post('/crearpreguntas', schemaMiddleware(preguntaSchema), preguntaMiddleware.existeCodigoPregunta, preguntasController.crearPregunta);
router.get('/mostrarpreguntas', preguntasController.mostrarPreguntas);
router.get('/mostrarpreguntasconopciones', preguntasController.mostrarPreguntasConOpciones);
router.put('/editarpreguntas/:id', preguntaMiddleware.existePreguntaPorId, preguntasController.editarPregunta);
router.delete('/eliminarpreguntas/:id', preguntaMiddleware.existePreguntaPorId, preguntasController.eliminarPregunta);

module.exports = router;
