export class UsernameExistsError extends Error {
    message = 'A user with this username already exists.';
}

export class EmailExistsError extends Error {
    message = 'A user with this email already exists.';
}

export class LoginFailedError extends Error {
    message = 'Username/Email and/or password are incorrect.';
}
