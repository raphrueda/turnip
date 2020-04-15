import { compare, hash } from 'bcrypt';

import { dbService } from '../db-service';
import { Tables } from '../tables';

const saltRounds = 10;

class UsernameExistsError extends Error {
    message = 'A user with this username already exists.';
}

class EmailExistsError extends Error {
    message = 'A user with this email already exists.';
}

export const createUser = async (
    username: string,
    email: string,
    password: string
) => {
    const usernameCheck = await dbService.query(
        `SELECT id FROM ${Tables.Users} WHERE username=$1`,
        [username]
    );
    console.log(usernameCheck);
    if (usernameCheck.rowCount !== 0) throw new UsernameExistsError();

    const emailCheck = await dbService.query(
        `SELECT id FROM ${Tables.Users} WHERE email=$1`,
        [email]
    );
    if (emailCheck.rowCount !== 0) throw new EmailExistsError();

    const pw_hash = await hash(password, saltRounds);
    const query = `INSERT INTO ${Tables.Users} (username, email, pw_hash) VALUES ($1, $2, $3) RETURNING id, username, email`;
    const values = [username, email, pw_hash];
    const result = await dbService.query(query, values);
    return result.rows[0];
};

// TODO Move to a global error
class LoginFailedError extends Error {
    message = 'Username/Email and/or password are incorrect.';
}

export const login = async (
    username: string,
    email: string,
    password: string
) => {
    const providedFieldName = username !== undefined ? 'username' : 'email';
    const providedFieldValue = username ?? email;

    const results = await dbService.query(
        `SELECT username, email, pw_hash FROM ${Tables.Users} WHERE ${providedFieldName}=$1`,
        [providedFieldValue]
    );
    if (results.rowCount === 0) throw new LoginFailedError();

    const { pw_hash } = results.rows[0];
    const matched = await compare(password, pw_hash);
    if (!matched) throw new LoginFailedError();
    return true;
};
