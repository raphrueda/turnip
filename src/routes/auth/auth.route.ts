import { Router } from 'express';

import { createUser, login } from '@db/auth';

import { loginSchema, signupSchema } from './auth.schema';
import { validate } from '../utils';

const authRoute = Router();

// #region Sign up
authRoute.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = validate(signupSchema, req.body);
        const user = await createUser(username, email, password);
        const { username: createdUsername } = user;
        res.status(201).json(`New user '${createdUsername}' created.`);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// #endregion

// #region Log in
authRoute.post('/login', async (req, res) => {
    try {
        const { username, email, password } = validate(loginSchema, req.body);
        await login(username, email, password);
        res.status(200).json('Login successful.');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// #endregion

export const auth = authRoute;
