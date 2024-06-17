const { Op } = require('sequelize');

const modeloSurveysQuestions = require('../db/models').survey_questions;
const modeloSurveysOptions = require('../db/models').survey_options;

// Controlador para crear una pregunta
exports.crearPregunta = async (req, res) => {
    try {
        const data = await modeloSurveysQuestions.bulkCreate(req.body);
        res.status(201).json({ datos: data });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para mostrar todas las preguntas
exports.mostrarPreguntas = async (req, res) => {
    try {
        const data = await modeloSurveysQuestions.findAll();
        res.status(200).json({ datos: data });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para mostrar preguntas con sus opciones
exports.mostrarPreguntasConOpciones = async (req, res) => {
    try {
        const data = await modeloSurveysQuestions.findAll({
            include: [{ model: modeloSurveysOptions }]
        });
        res.status(200).json({ datos: data });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para editar una pregunta
exports.editarPregunta = async (req, res) => {
    const [updated] = await modeloSurveysQuestions.update(req.body, {
        where: { id: req.params.id }
    });
    const updatedQuestion = await modeloSurveysQuestions.findOne({ where: { id: req.params.id } });
    res.status(200).json({ datos: updatedQuestion });
};

// Controlador para eliminar una pregunta
exports.eliminarPregunta = async (req, res) => {
    await modeloSurveysQuestions.destroy({
        where: { id: req.params.id }
    });
    res.status(200).json({ mensaje: 'Pregunta eliminada con éxito' });
};

