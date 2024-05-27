const Joi = require('joi');

const personaSchema = Joi.object().keys({
    dni: Joi.string().pattern(/^\d{8}$/).required().messages({ // el pattern es para que sean exactamente ocho caracteres y numericos todos
        'any.required': 'DNI es requerido',
        'string.pattern.base': 'El DNI debe tener exactamente 8 caracteres numéricos y no debe contener puntos',
    }),
    firstname: Joi.string().required().messages({
        'any.required': 'El nombre es requerido',
        'string.base': 'El nombre debe ser un texto',
    }),
    lastname: Joi.string().required().messages({
        'any.required': 'El apellido es requerido',
        'string.base': 'El apellido debe ser un texto',
    }),
    gender: Joi.string().valid('M', 'F', 'X').insensitive().required().messages({
        'any.required': 'El género es requerido',
        'string.base': 'El género debe ser una letra',
        'any.only': 'El género debe ser "M", "F" o "X" (mayúsculas o minúsculas)',
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'El correo electrónico es requerido',
        'string.email': 'El correo electrónico debe ser válido y contener el simbolo @',
    }),
    password: Joi.string().min(8).max(16).required().messages({
        'any.required': 'La contraseña es requerida',
        'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
        'string.max': 'La contraseña no debe tener más de {#limit} caracteres',
    }),
    active: Joi.boolean().required().messages({
        'any.required': 'El estado activo es requerido',
        'boolean.base': 'El estado activo debe ser un valor booleano (true/false)',
    }),
}).messages({
    'object.unknown': 'Se encontró un campo desconocido en el objeto, por favor verificar.',
})

module.exports = personaSchema;
