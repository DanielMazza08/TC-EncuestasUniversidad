// routes/personasRoutes.js
const express = require('express');
const router = express.Router();
const personasController = require('../controllers/personasController');
const personaMiddleware = require('../middlewares/persona.middleware');

router.post('/crearpersona', personaMiddleware.existePersonaPorDni, personasController.crearPersona);
router.get('/mostrarpersonas', personasController.mostrarPersonas);
router.get('/mostrarpersonasporid/:id', personaMiddleware.existePersonaPorId, personasController.mostrarPersonaPorID);
router.delete('/eliminarpersona/:id', personaMiddleware.existePersonaPorId, personasController.eliminarPersona);
router.put('/editarpersona/:id', personaMiddleware.existePersonaPorId, personasController.editarPersona);

module.exports = router;
