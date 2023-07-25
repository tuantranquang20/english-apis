import { INPUT_TEXT_MAX_LENGTH } from '@src/commons/constants';
import Joi from '@src/commons/plugins/joi';
import { baseFilterSchema } from '@src/commons/utils/validator';

export const createUserValidator = Joi.object({
  username: Joi.string(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().required(),
});

export const userFilterValidator = Joi.object({
  ...baseFilterSchema,
});

export const updateUserValidator = Joi.object({
  username: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
});
