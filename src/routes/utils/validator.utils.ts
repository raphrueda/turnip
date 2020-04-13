import { ObjectSchema } from '@hapi/joi';

export const validate = (schema: ObjectSchema, params) => {
    const { value, error } = schema.validate(params);

    if (error) {
        throw new Error(
            `Bad data, ${error.details.map(
                (detail) => `${detail.path.join(',')}: ${detail.message}`
            )}`
        );
    }

    return value;
};
