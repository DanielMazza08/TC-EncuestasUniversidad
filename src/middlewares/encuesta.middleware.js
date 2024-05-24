const modeloSurveys = require('../db/models').surveys

const existeEncuestaPorId = async (req, res, next) => {
    const id = req.params.id
    const surveyId = await modeloSurveys.findByPk(id) 
    if(!surveyId){
        return res.status(400).json({error: `La encuesta con ID: ${id} no se encuentra registrada.`})
    }
    next()
}

module.exports = {existeEncuestaPorId}