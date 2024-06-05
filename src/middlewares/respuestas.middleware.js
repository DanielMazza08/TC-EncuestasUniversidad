const modeloPersonReportData = require('../db/models').person_report_data;
const modeloSurveys = require('../db/models').surveys;
const modeloSurveysQuestions = require('../db/models').survey_questions;
const modeloSurveysOptions = require('../db/models').survey_options;

/* const validarCamposExistentes = async (req, res, next) => {
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ error: 'El body de la consulta debe ser un array de datos (bulkCreate).' });
    }

    const modelos = {
        persona: modeloPersonReportData,
        encuesta: modeloSurveys,
        pregunta: modeloSurveysQuestions,
        opcion: modeloSurveysOptions
    };

    for (const item of data) {
        const errores = [];

        for (const key in modelos) {
            const { [key + '_id']: id } = item;

            if (id) {
                const registro = await modelos[key].findOne({ where: { id } });
                if (!registro) {
                    errores.push(`No existe ${key} con el ID: ${id}.`);
                }
            }
        }

        if (errores.length > 0) {
            return res.status(400).json({ error: errores.join(' ') });
        }
    }

    next();
}; */

const validarEncuestaExistente = async (req, res, next) => {
    const { surveyId } = req.params;

    try {
        if (surveyId) {
            const survey = await modeloSurveys.findByPk(surveyId);
            if (!survey) {
                return res.status(400).json({ error: `No existe encuesta con el ID: ${surveyId}.` });
            }
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const validarPreguntaExistente = async (req, res, next) => {
    const { questionId } = req.params;

    try {
        if (questionId) {
            const question = await modeloSurveysQuestions.findByPk(questionId);
            if (!question) {
                return res.status(400).json({ error: `No existe pregunta con el ID: ${questionId}.` });
            }
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const validarOpcionExistente = async (req, res, next) => {
    const { optionId } = req.params;

    try {
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

const validarPersonaActiva = async (req, res, next) => {
    const data = req.body;
    try {
        for (const item of data) {
            const { person_id } = item;

            const person = await modeloPersonReportData.findByPk(person_id);
            if (!person.active) {
                return res.status(404).json({ error: `La persona con ID ${person_id} no está activa.` });
            }
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const validarEncuestaActiva = async (req, res, next) => {
    const data = req.body;
    try {
        for (const item of data) {
            const { survey_id } = item;

            const survey = await modeloSurveys.findByPk(survey_id);
            if (!survey.active) {
                return res.status(404).json({ error: `La encuesta con ID ${survey_id} no está activa.` });
            }
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { existePersonaPorId, validarPersonaActiva, validarEncuestaActiva, validarEncuestaExistente, validarPreguntaExistente, validarOpcionExistente };
