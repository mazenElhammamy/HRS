import Joi from 'joi';

export const Schema = Joi.object({
    firstname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    lastname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    fullname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    address: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),


    mobileNumber: Joi.string()
        .trim()
        .regex(/^(010|011|012|015)[0-9]{8}$/).
        required(),

    homeNumber: Joi.string()
        .trim()
        .regex(/^[0-9]{9}$/),

    password: Joi.string().messages({
        "string.pattern.base": "Password is in correct"
    })
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
