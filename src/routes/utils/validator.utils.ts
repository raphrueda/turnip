import { ObjectSchema } from '@hapi/joi';

import { SchemaValidationError } from '@errors';

export const validate = <T>(schema: ObjectSchema<T>, params): T => {
    const { value, error } = schema.validate(params);

    if (error) {
        throw new SchemaValidationError(error);
    }

    return value;
};
