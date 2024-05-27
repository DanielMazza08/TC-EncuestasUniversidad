// routes/personasRoutes.js
const express = require('express');
const router = express.Router();
const personasController = require('../controllers/personasController');
const personaMiddleware = require('../middlewares/persona.middleware');
const schemaMiddleware = require('../middlewares/schema.middleware');
const personaSchema = require('../schemas/persona.schema');

router.post('/crearpersona', schemaMiddleware(personaSchema), personaMiddleware.existePersonaPorDni, personasController.crearPersona);
router.get('/mostrarpersonas', personasController.mostrarPersonas);
router.get('/mostrarpersonasporid/:id', personaMiddleware.existePersonaPorId, personasController.mostrarPersonaPorID);
router.delete('/eliminarpersona/:id', personaMiddleware.existePersonaPorId, personasController.eliminarPersona);
router.put('/editarpersona/:id', schemaMiddleware(personaSchema), personaMiddleware.existePersonaPorId, personasController.editarPersona);

module.exports = router;
