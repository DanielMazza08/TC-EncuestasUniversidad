const Joi = require('joi');

const respuestaSchema = Joi.array().items(
    Joi.object().keys({
        person_id: Joi.number().required().messages({
            'any.required': 'person_id es requerido',
            'number.base': 'person_id debe tener un valor numérico',
        }),
        survey_id: Joi.number().required().messages({
            'any.required': 'survey_id es requerido',
            'number.base': 'survey_id debe tener un valor numérico',
        }),
        question_id: Joi.number().required().messages({
            'any.required': 'question_id es requerido',
            'number.base': 'question_id debe tener un valor numérico',
        }),
        option_id: Joi.number().required().messages({
            'any.required': 'option_id es requerido',
            'number.base': 'option_id debe tener un valor numérico',
        }),
    }).messages({
        'object.unknown': 'Se encontró un campo desconocido en el objeto, por favor verificar.',
    })
);

module.exports = respuestaSchema;
