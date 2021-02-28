import Joi from 'joi';

export const Schema = Joi.object({
    departmentName: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
})
