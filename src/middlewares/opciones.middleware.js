const modeloSurveysOptions = require('../db/models').survey_options;
const modeloSurveysQuestions = require('../db/models').survey_questions;

const existeOpcionPorId = async (req, res, next) => {
    const id = req.params.id
    const opcionId = await modeloSurveysOptions.findByPk(id) 
    if(!opcionId){
        return res.status(400).json({error: `La opción con ID: ${id} no se encuentra registrada.`})
    }
    next()
}

const existePreguntaID = async (req, res, next) => {
    const options = req.body;

    if (!Array.isArray(options) || options.length === 0) {
        return res.status(400).json({ error: 'El body de la consulta deber ser un array de opciones (bulkCreate).' });
    }

    for (const option of options) {
        const { question_id } = option;

        const question = await modeloSurveysQuestions.findOne({ where: { id: question_id } });

        if (!question) {
            return res.status(400).json({ error: `No se pueden agregar las opciones porque no existe pregunta con el Question ID: ${question_id}.` });
        }
    }

    next();
};


module.exports = {existeOpcionPorId, existePreguntaID}