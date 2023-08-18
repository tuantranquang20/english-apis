import { INPUT_TEXT_MAX_LENGTH } from '@src/commons/constants';
import Joi from '@src/commons/plugins/joi';
import { UserHistoryType } from './user-history.constant';
import { IdObjectSchema, baseFilterSchema } from '@src/commons/utils/validator';

export const createUserHistoryValidator = Joi.object({
  ...baseFilterSchema,
  type: Joi.string()
    .valid(...Object.values(UserHistoryType))
    .required(),
  value: Joi.string().max(INPUT_TEXT_MAX_LENGTH).required(),
  userId: IdObjectSchema.required(),
});
