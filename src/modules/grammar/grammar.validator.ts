import { INPUT_TEXT_MAX_LENGTH } from '@src/commons/constants';
import Joi from '@src/commons/plugins/joi';
import { IdObjectSchema, baseFilterSchema } from '@src/commons/utils/validator';

export const createGrammarValidator = Joi.object({
  title: Joi.string().max(INPUT_TEXT_MAX_LENGTH).required(),
  image: Joi.string().required(),
  know: Joi.array().items(Joi.string().required()).optional(),
  use: Joi.array()
    .items(
      Joi.object({
        ex: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
        grammar: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
      }),
    )
    .optional(),
  lessonId: IdObjectSchema.optional(),
});

export const grammarFilterValidator = Joi.object({
  ...baseFilterSchema,
  lessonId: IdObjectSchema.required(),
});

export const updateGrammarValidator = Joi.object({
  title: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
  image: Joi.string().optional(),
  know: Joi.array().items(Joi.string().optional()).optional(),
  use: Joi.array()
    .items(
      Joi.object({
        ex: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
        grammar: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
      }),
    )
    .optional(),
  lessonId: IdObjectSchema.optional(),
});
