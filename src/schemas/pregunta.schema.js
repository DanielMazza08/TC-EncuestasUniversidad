const Joi = require('joi');

const preguntaSchema = Joi.array().items(
    Joi.object({
        question_title: Joi.string().min(10).max(50).insensitive().required().messages({
            'any.required': 'question_title es requerido',
            'string.max': 'question_title tiene como límite máximo {#limit} caracteres',
            'string.min': 'question_title debe tener al menos {#limit} caracteres',
            'string.empty': 'question_title no puede estar vacío',
        }),
        survey_id: Joi.number().required().messages({
            'any.required': 'survey_id es requerido',
            'number.base': 'survey_id debe ser un valor numérico',
        }),
        question_code: Joi.string().min(2).alphanum().required().messages({
            'any.required': 'question_code es requerido',
            'string.min': 'question_code debe tener al menos {#limit} caracteres',
            'string.alphanum': 'question_code debe contener solo caracteres alfanuméricos',
            'string.empty': 'question_code no puede estar vacío',
        }),
    }).messages({
        'object.unknown': 'Se encontró un campo desconocido en el objeto, por favor verificar.',
    })
);

module.exports = preguntaSchema;

