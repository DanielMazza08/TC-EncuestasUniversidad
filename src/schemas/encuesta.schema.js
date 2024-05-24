const Joi = require('joi')

const encuestaSchema = Joi.object().keys( {
    survey_name: Joi.string().required().min(5).max(25).messages({
            'any.required': 'survey_name es requerido',
    }),
    active: Joi.boolean().required().messages({
        'any.required': 'active es requerido',
    }),
})

module.exports = encuestaSchema