const express = require('express');
const router = express.Router();
const encuestasController = require('../controllers/encuestasController');
const schemaMiddleware = require('../middlewares/schema.middleware');
const encuestaMiddleware = require('../middlewares/encuesta.middleware');
const encuestaSchema = require('../schemas/encuesta.schema');

router.post('/crearencuestas', schemaMiddleware(encuestaSchema), encuestasController.crearEncuesta);
router.get('/mostrarencuestas', encuestasController.mostrarEncuestas);
router.delete('/eliminarencuestas/:id', encuestaMiddleware.existeEncuestaPorId, encuestasController.eliminarEncuestas);
router.get('/mostrarencuestasconpreguntas', encuestasController.mostrarEncuestasConPreguntas);
router.get('/mostrarencuestasconpreguntasyopciones', encuestasController.mostrarEncuestasConPreguntasYOpciones);
router.put('/editarencuestas/:id', encuestaMiddleware.existeEncuestaPorId, encuestasController.editarEncuesta);

module.exports = router;
