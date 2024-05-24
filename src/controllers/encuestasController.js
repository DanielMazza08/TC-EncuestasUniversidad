const modeloSurveys = require('../db/models').surveys;
const modeloSurveysQuestions = require('../db/models').survey_questions;
const modeloSurveysOptions = require('../db/models').survey_options;

// Controlador para crear una encuesta
exports.crearEncuesta = async (req, res) => {
    try {
        const data = await modeloSurveys.create(req.body);
        res.status(201).json({ datos: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para mostrar todas las encuestas
exports.mostrarEncuestas = async (req, res) => {
    try {
        const data = await modeloSurveys.findAll();
        res.status(200).json({ datos: data });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para mostrar encuestas solo con preguntas
exports.mostrarEncuestasConPreguntas = async (req, res) => {
    try {
        const data = await modeloSurveys.findAll({
            include: [{ model: modeloSurveysQuestions }]
        });
        res.status(200).json({ datos: data });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para mostrar encuestas con preguntas y opciones
exports.mostrarEncuestasConPreguntasYOpciones = async (req, res) => {
    try {
        const data = await modeloSurveys.findAll({
            include: [
                {
                    model: modeloSurveysQuestions,
                    include: [{ model: modeloSurveysOptions }]
                }
            ]
        });
        res.status(200).json({ datos: data });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para editar una encuesta
exports.editarEncuesta = async (req, res) => {
    const [updated] = await modeloSurveys.update(req.body, {
        where: { id: req.params.id }
    });
    const updatedSurvey = await modeloSurveys.findOne({ where: { id: req.params.id } });
    res.status(200).json({ datos: updatedSurvey });
};

// Controlador para eliminar una encuesta
exports.eliminarEncuestas = async (req, res) => {
    await modeloSurveys.destroy({
        where: { id: req.params.id }
    });
    res.status(200).json({ mensaje: 'Encuesta eliminada con éxito' });
};

