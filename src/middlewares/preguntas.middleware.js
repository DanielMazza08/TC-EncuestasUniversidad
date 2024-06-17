const modeloSurveysQuestions = require('../db/models').survey_questions;

const existeCodigoPregunta = async (req, res, next) => {
    const preguntas = req.body;

    if (!Array.isArray(preguntas) || preguntas.length === 0) {
        return res.status(400).json({ error: 'Se esperaba un array de preguntas en req.body.' });
    }

    try {
        const questionCodes = preguntas.map(pregunta => pregunta.question_code);

        // Buscar todas las preguntas que coincidan con los question_code
        const existingQuestions = await modeloSurveysQuestions.findAll({
            where: {
                question_code: questionCodes
            }
        });

        // Verificar qué question_code no existen en la base de datos
        const nonExistingQuestionCodes = questionCodes.filter(code => !existingQuestions.some(q => q.question_code === code));

        if (nonExistingQuestionCodes.length !== questionCodes.length) {
            const existingQuestionCodes = existingQuestions.map(q => q.question_code);
            const duplicateCodes = questionCodes.filter(code => existingQuestionCodes.includes(code));
            return res.status(400).json({ error: `Algunos de los códigos de pregunta ya existen en la base de datos: ${duplicateCodes.join(', ')}` });
        }

        next();
    } catch (error) {
        console.error('Error en existeCodigoPregunta:', error);
        return res.status(500).json({ error: error.message });
    }
};


const existePreguntaPorId = async (req, res, next) => {
    const id = req.params.id
    const questionId = await modeloSurveysQuestions.findByPk(id) 
    if(!questionId){
        return res.status(400).json({error: `La pregunta con ID: ${id} no se encuentra registrada.`})
    }
    next()
}

module.exports = {existePreguntaPorId, existeCodigoPregunta}