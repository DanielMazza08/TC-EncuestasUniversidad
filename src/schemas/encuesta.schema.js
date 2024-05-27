const Joi = require('joi');

const encuestaSchema = Joi.object().keys({
    survey_name: Joi.string().required().min(10).max(30).messages({
            'string.base': 'survey_name debe ser un texto',
            'string.empty': 'survey_name no puede estar vacío',
            'string.min': 'survey_name debe tener al menos {#limit} caracteres',
            'string.max': 'survey_name no debe exceder los {#limit} caracteres',
            'any.required': 'survey_name es requerido',
        }),
    active: Joi.boolean().required().messages({
            'boolean.base': 'active debe ser un valor booleano (true/false)',
            'any.required': 'active es requerido',
        }),
}).messages({
    'object.unknown': 'Se encontró un campo desconocido en el objeto, por favor verificar.',
})

module.exports = encuestaSchema;
