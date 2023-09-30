import { query } from 'express'
import joi from 'joi'

export const signUpSchema = {
    body: joi.object({
        username: joi.string().max(10).min(4).messages({
            'any.required': 'User Name Is Required',
        }).required(),
        email: joi.string().email({tlds: {allow:['com','net','org']} }).required(),
        password: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).messages({
            'string.pattern.base': 'Password Regex Fail'
        }).required(),
        ConPasswprd: joi.valid(joi.ref('password')).required(),
        gender: joi.string().optional(),
    }).required(),
    
    // query: joi.object({
    //     test: joi.string().min(3).max(10).required()
    // }).required()
}


export const signInSchema = {
    body: joi.object({
       
        email: joi
        .string()
        .email({tlds: {allow:['com','net','org']} })
        .required(),
        password: joi
        .string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        .messages({
            'string.pattern.base': 'Password Regex Fail'
        }),
    })
    .options({presence: 'required'})
    .required(),
}