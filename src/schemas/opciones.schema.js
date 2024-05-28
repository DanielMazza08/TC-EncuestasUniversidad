const Joi = require('joi');

const opcionesSchema = Joi.array().items(
    Joi.object({
        label_option: Joi.string().min(2).max(40).insensitive().required().messages({
                'any.required': 'label_option es requerido',
                'string.max': 'label_option tiene como límite máximo {#limit} caracteres',
                'string.min': 'label_option debe tener al menos {#limit} caracteres',
                'string.empty': 'label_option no puede estar vacío',
            }),
        question_id: Joi.number().required().messages({
                'any.required': 'question_id es requerido',
                'number.base': 'question_id debe tener un valor numérico',
            }),
    }).messages({
        'object.unknown': 'Se encontró un campo desconocido en el objeto, por favor verificar.',
    })
);

module.exports = opcionesSchema;
