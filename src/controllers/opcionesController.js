const modeloSurveysOptions = require('../db/models').survey_options;

// Controlador para crear una opción
exports.crearOpcion = async (req, res) => {
    try {
        const data = await modeloSurveysOptions.bulkCreate(req.body);
        res.status(201).json({ datos: data });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para mostrar todas las opciones
exports.mostrarOpciones = async (req, res) => {
    try {
        const data = await modeloSurveysOptions.findAll();
        res.status(200).json({ datos: data });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para editar una opción
exports.editarOpcion = async (req, res) => {
    const [updated] = await modeloSurveysOptions.update(req.body, {
        where: { id: req.params.id }
    });
    const updatedOption = await modeloSurveysOptions.findOne({ where: { id: req.params.id } });
    res.status(200).json({ datos: updatedOption });
};

// Controlador para eliminar una opción
exports.eliminarOpcion = async (req, res) => {
    await modeloSurveysOptions.destroy({
        where: { id: req.params.id }
    });
    res.status(200).json({ mensaje: 'Opción eliminada con éxito' });
};


