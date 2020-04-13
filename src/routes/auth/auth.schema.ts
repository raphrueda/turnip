import * as Joi from '@hapi/joi';

export const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        /**
         * - Contains at least one number
         * - Contains at least one lowercase letter
         * - Contains at least one uppercase letter
         * - Contains at least one of the following: @#$%^&+=
         */

        .pattern(
            new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
        )
        .required(),
    // name: Joi.string().alphanum().min(1).max(30).required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
