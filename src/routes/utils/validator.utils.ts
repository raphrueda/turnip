import { ObjectSchema } from '@hapi/joi';

// TODO Move to a global error
class SchemaVaildationError extends Error {}

export const validate = <T>(schema: ObjectSchema<T>, params): T => {
    const { value, error } = schema.validate(params);

    if (error) {
        throw new SchemaVaildationError(
            `Schema mismatch, ${error.details.map(
                (detail) => `${detail.message}`
            )}`
        );
    }

    return value;
};
