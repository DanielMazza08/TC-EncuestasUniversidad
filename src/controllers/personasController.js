const { Op } = require('sequelize');

const modeloPersonReportData = require('../db/models').person_report_data;

// Controlador para dar de alta una persona
exports.crearPersona = async (req, res) => {
    const persona = req.body;
        try {
            const nuevaPersona =  await modeloPersonReportData.create(persona)
             res.status(201).json(nuevaPersona)
        }
        catch(error) { 
            res.status(500).json({ error: error.message });
        };
};

// Controlador para mostrar todas las personas
exports.mostrarPersonas = async (req, res) => {
    try {
        const data = await modeloPersonReportData.findAll();
        res.status(200).json({ datos: data });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para buscar una persona por ID
exports.mostrarPersonaPorID = async (req, res) => {
    const data = await modeloPersonReportData.findOne({
        where: { id: req.params.id }
    });
    res.status(200).json({ datos: data });
};

// Controlador para eliminar una persona
exports.eliminarPersona = async (req, res) => {
    await modeloPersonReportData.destroy({
        where: { id: req.params.id }
    });
    res.status(200).json({ mensaje: 'Persona eliminada con éxito' });
};

// Controlador para editar una persona
exports.editarPersona = async (req, res) => {
    await modeloPersonReportData.update(req.body, {
        where: { id: req.params.id }
    });
    const updatePersona = await modeloPersonReportData.findOne({ where: { id: req.params.id } });
    res.status(200).json({ datos: updatePersona });
};
