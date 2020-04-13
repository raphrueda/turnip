import { compare, hash } from 'bcrypt';
import { Router } from 'express';

import { loginSchema, signupSchema } from './auth.schema';
import { validate } from '../utils';

const authRoute = Router();

// TODO implement pg layer
let storedPW;
// TODO research the best option for rounds
const saltRounds = 10;

// #region Sign up
authRoute.post('/signup', (req, res) => {
    try {
        const value = validate(signupSchema, req.body);
        hash(value.password, saltRounds, (err, hash) => {
            storedPW = hash;
            res.status(201).json({ ...value, password: hash });
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// #endregion

// #region Log in
authRoute.post('/login', (req, res) => {
    try {
        const value = validate(loginSchema, req.body);
        compare(value.password, storedPW, (error, result) => {
            if (result) {
                res.status(200).json({ result: 'success!' });
            } else {
                res.status(401).json({ result: 'who r u?' });
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// #endregion

export const auth = authRoute;
