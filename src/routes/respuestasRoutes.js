const express = require('express');
const router = express.Router();
const respuestasController = require('../controllers/respuestasController');
const respuestasMiddleware = require('../middlewares/respuestas.middleware');
const schemaMiddleware = require('../middlewares/schema.middleware');
const respuestaSchema = require('../schemas/respuesta.schema');

router.post('/realizarencuesta', schemaMiddleware(respuestaSchema), respuestasMiddleware.validarActivoPersonaEncuesta, respuestasMiddleware.validarCamposExistentes, respuestasController.realizarEncuesta);
router.get('/mostrarresultados/:personId', respuestasMiddleware.existePersonaPorId, respuestasController.mostrarResultadosEncuestas);
router.get('/mostrarpersonasquerespondieron', respuestasController.mostrarPersonasQueRespondieron);
router.get('/mostrarPersonasquerespondieronencuesta/:surveyId', respuestasController.mostrarPersonasQueRespondieronEncuesta);
router.get('/mostrarcantidaddevecesqueseeligioopcion/:surveyId/:questionId/:optionId', respuestasMiddleware.validarIdsExistentes, respuestasController.mostrarCantidadDeVecesQueSeEligioOpcion);

module.exports = router;
