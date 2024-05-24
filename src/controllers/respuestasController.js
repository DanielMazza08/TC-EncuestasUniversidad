const { Sequelize } = require('sequelize');
const sequelize = require('../db/models').sequelize;

const modeloPersonReportData = require('../db/models').person_report_data;
const modeloSurveys = require('../db/models').surveys;
const modeloSurveysQuestions = require('../db/models').survey_questions;
const modeloSurveysOptions = require('../db/models').survey_options;
const modeloSurveyResponseData = require('../db/models').survey_response_data;

// Controlador para realizar una encuesta
exports.realizarEncuesta = async (req, res) => {
    try {
        const data = await modeloSurveyResponseData.bulkCreate(req.body);
        res.status(201).json({ datos: data });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para mostrar los resultados de las encuestas
exports.mostrarResultadosEncuestas = async (req, res) => {
    const personId = req.params.personId;
    try {
        const data = await modeloSurveyResponseData.findAll({
            where: { person_id: personId },
            include: [
                { model: modeloPersonReportData, as: 'person_report_data' },
                { model: modeloSurveys },
                { model: modeloSurveysQuestions },
                { model: modeloSurveysOptions }
            ]
        });
        res.status(200).json({ datos: data });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para mostrar las personas que respondieron
exports.mostrarPersonasQueRespondieron = async (req, res) => {
    try {
        const data = await modeloSurveyResponseData.findAll({
            include: [
                { 
                    model: modeloPersonReportData,
                    attributes: ['dni', 'firstname', 'lastname', 'email'],
                    as: 'person_report_data' //Eligo que campos de la persona quiero mostrar
                }
            ]
        });
        res.status(200).json({ personas: data.map(record => record.person_report_data) });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para mostrar la cantidad de veces que se eligió una opción de una pregunta y encuesta especifica
exports.mostrarCantidadDeVecesQueSeEligioOpcion = async (req, res) => {
    const { surveyId, questionId, optionId } = req.params;
    let whereCondition = { option_id: optionId };

    if (surveyId) {
        whereCondition.survey_id = surveyId;
    }
    if (questionId) {
        whereCondition.question_id = questionId;
    }

    try {
        const data = await modeloSurveyResponseData.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('*')), 'count']
            ],
            where: whereCondition,
        });
        const count = data[0].dataValues.count;
        res.status(200).json({ count });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para mostrar las personas que respondieron una encuesta específica
exports.mostrarPersonasQueRespondieronEncuesta = async (req, res) => {
    const surveyId = req.params.surveyId;
    try {
        const data = await modeloSurveyResponseData.findAll({
            include: [
                { 
                    model: modeloPersonReportData,
                    attributes: ['dni', 'firstname', 'lastname', 'email'],
                    as: 'person_report_data' //Eligo que campos de la persona quiero mostrar
                }
            ],
            where: { survey_id: surveyId }
        });
        res.status(200).json({ personas: data.map(record => record.person_report_data) });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
