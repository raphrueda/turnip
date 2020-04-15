import * as Joi from '@hapi/joi';

interface SignupSchema {
    username: string;
    email: string;
    password: string;
}

export const signupSchema = Joi.object<SignupSchema>({
    username: Joi.string().alphanum().max(40).required(),
    email: Joi.string().email().max(40).required(),
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
});

interface LoginSchema {
    username?: string;
    email?: string;
    password: string;
}

export const loginSchema = Joi.object<LoginSchema>({
    username: Joi.string().alphanum().max(40),
    email: Joi.string().email(),
    password: Joi.string().required(),
}).xor('username', 'email');
