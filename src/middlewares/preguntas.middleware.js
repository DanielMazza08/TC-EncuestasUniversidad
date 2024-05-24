const modeloSurveysQuestions = require('../db/models').survey_questions;

const existeCodigoPregunta = async (req, res, next) => {
    const { question_code } = req.body
    const codigoPregunta = await modeloSurveysQuestions.findOne({where: {question_code}} , {question_code})
    if(codigoPregunta){
        return res.status(400).json({error: `El codigo de pregunta: ${question_code} ya se encuentra registrado.`})
    }
    next()
}

const existePreguntaPorId = async (req, res, next) => {
    const id = req.params.id
    const questionId = await modeloSurveysQuestions.findByPk(id) 
    if(!questionId){
        return res.status(400).json({error: `La pregunta con ID: ${id} no se encuentra registrada.`})
    }
    next()
}

module.exports = {existePreguntaPorId, existeCodigoPregunta}