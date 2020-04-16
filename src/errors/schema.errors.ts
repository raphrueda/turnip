import { ValidationError } from '@hapi/joi';

export class SchemaValidationError extends Error {
    constructor(validationError: ValidationError) {
        super();
        this.message = `Data does not match schema: ${validationError.details.map(
            (detail) => `${detail.message}`
        )}`;
    }
}
