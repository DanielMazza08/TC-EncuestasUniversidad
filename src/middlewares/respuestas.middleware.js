const modeloPersonReportData = require('../db/models').person_report_data;
const modeloSurveys = require('../db/models').surveys;
const modeloSurveysQuestions = require('../db/models').survey_questions;
const modeloSurveysOptions = require('../db/models').survey_options;

const validarCamposExistentes = async (req, res, next) => {
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ error: 'El body de la consulta debe ser un array de datos (bulkCreate).' });
    }

    for (const item of data) {
        const { person_id, survey_id, question_id, option_id } = item;

        const [person, survey, question, option] = await Promise.all([
            person_id ? modeloPersonReportData.findOne({ where: { id: person_id } }) : Promise.resolve(null),
            survey_id ? modeloSurveys.findOne({ where: { id: survey_id } }) : Promise.resolve(null),
            question_id ? modeloSurveysQuestions.findOne({ where: { id: question_id } }) : Promise.resolve(null),
            option_id ? modeloSurveysOptions.findOne({ where: { id: option_id } }) : Promise.resolve(null)
        ]);

        if (person_id && !person) {
            return res.status(400).json({ error: `No existe persona con el Person ID: ${person_id}.` });
        }

        if (survey_id && !survey) {
            return res.status(400).json({ error: `No existe encuesta con el Survey ID: ${survey_id}.` });
        }

        if (question_id && !question) {
            return res.status(400).json({ error: `No existe pregunta con el Question ID: ${question_id}.` });
        }

        if (option_id && !option) {
            return res.status(400).json({ error: `No existe opción con el Option ID: ${option_id}.` });
        }
    }

    next();
};

const validarIdsExistentes = async (req, res, next) => {
    const { surveyId, questionId, optionId } = req.params;

    try {
        if (surveyId) {
            const survey = await modeloSurveys.findByPk(surveyId);
            if (!survey) {
                return res.status(400).json({ error: `No existe encuesta con el ID: ${surveyId}.` });
            }
        }
        if (questionId) {
            const question = await modeloSurveysQuestions.findByPk(questionId);
            if (!question) {
                return res.status(400).json({ error: `No existe pregunta con el ID: ${questionId}.` });
            }
        }
        if (optionId) {
            const option = await modeloSurveysOptions.findByPk(optionId);
            if (!option) {
                return res.status(400).json({ error: `No existe opción con el ID: ${optionId}.` });
            }
        }

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const existePersonaPorId = async (req, res, next) => {
    const { personId } = req.params;
    try {
        if (personId) {
            const person = await modeloPersonReportData.findByPk(personId);
            if (!person) {
                return res.status(400).json({ error: `No existe persona con el ID: ${personId}.` });
            }
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { validarCamposExistentes, validarIdsExistentes, existePersonaPorId };
