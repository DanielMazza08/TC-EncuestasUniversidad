const modeloPersonReportData = require('../db/models').person_report_data;

const existePersonaPorDni = async (req, res, next) => {
    const { dni } = req.body
    const personaDni = await modeloPersonReportData.findOne({where: {dni}} , {dni})
    if(personaDni){
        return res.status(400).json({error: `El DNI: ${dni} ya se encuentra registrado.`})
    }
    next()
}

const existePersonaPorId = async (req, res, next) => {
    const id = req.params.id
    const persona = await modeloPersonReportData.findByPk(id) 
    console.log(persona)
    if(!persona){
        return res.status(400).json({error: `No existe una persona con el ID: ${id}..`})
    }
    next()
}


module.exports = {existePersonaPorDni, existePersonaPorId}