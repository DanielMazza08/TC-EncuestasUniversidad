const express = require('express');
const router = express.Router();
const opcionesController = require('../controllers/opcionesController');
const opcionesMiddleware = require('../middlewares/opciones.middleware');

router.post('/crearopciones', opcionesMiddleware.existePreguntaID , opcionesController.crearOpcion);
router.get('/mostraropciones', opcionesController.mostrarOpciones);
router.put('/editaropciones/:id', opcionesMiddleware.existeOpcionPorId, opcionesController.editarOpcion);
router.delete('/eliminaropciones/:id', opcionesMiddleware.existeOpcionPorId, opcionesController.eliminarOpcion);

module.exports = router;
