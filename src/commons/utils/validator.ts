import {
  INPUT_TEXT_MAX_LENGTH,
  MAX_INTEGER,
  OrderDirection,
} from '../constants';
import Joi from '../plugins/joi';

export const baseFilterSchema = {
  keyword: Joi.string()
    .optional()
    .trim()
    .max(INPUT_TEXT_MAX_LENGTH)
    .allow('', null)
    .optional(),
  orderBy: Joi.string().optional(),
  orderDirection: Joi.string()
    .optional()
    .valid(...Object.values(OrderDirection)),
  limit: Joi.number().optional().integer().positive().max(MAX_INTEGER),
  page: Joi.number().optional().integer().positive().max(MAX_INTEGER),
};

export const IdObjectSchema = Joi.isObjectId();

export const deleteManySchema = Joi.array()
  .items(IdObjectSchema)
  .unique()
  .required();
