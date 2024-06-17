const express = require('express');
const router = express.Router();
const respuestasController = require('../controllers/respuestasController');
const respuestasMiddleware = require('../middlewares/respuestas.middleware');
const schemaMiddleware = require('../middlewares/schema.middleware');
const respuestaSchema = require('../schemas/respuesta.schema');

router.post('/realizarencuesta', schemaMiddleware(respuestaSchema), respuestasMiddleware.validarPersonaActiva, respuestasMiddleware.existePersonaPorId, respuestasMiddleware.validarEncuestaActiva, respuestasController.realizarEncuesta);
router.get('/mostrarresultados/:personId', respuestasMiddleware.existePersonaPorId, respuestasController.mostrarResultadosEncuestas);
router.get('/mostrarpersonasquerespondieron', respuestasController.mostrarPersonasQueRespondieron);
router.get('/mostrarPersonasquerespondieronencuesta/:surveyId', respuestasMiddleware.validarEncuestaExistente, respuestasController.mostrarPersonasQueRespondieronEncuesta);
router.get('/vecesqueeligioopcion/:surveyId/:questionId/:optionId', respuestasMiddleware.validarEncuestaActiva, respuestasMiddleware.validarEncuestaExistente,
respuestasMiddleware.validarPreguntaExistente, respuestasMiddleware.validarOpcionExistente , respuestasController.mostrarCantidadDeVecesQueSeEligioOpcion);

module.exports = router;
