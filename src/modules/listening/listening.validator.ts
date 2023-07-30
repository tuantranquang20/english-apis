import { INPUT_TEXT_MAX_LENGTH } from '@src/commons/constants';
import Joi from '@src/commons/plugins/joi';
import { IdObjectSchema, baseFilterSchema } from '@src/commons/utils/validator';
import { ListeningType } from './listening.constant';

export const createListeningValidator = Joi.object({
  lesson: Joi.isObjectId().required(),
  type: Joi.string()
    .valid(...Object.values(ListeningType))
    .required(),
  answer: Joi.string().max(INPUT_TEXT_MAX_LENGTH).required(),
  rawAnswer: Joi.string().max(INPUT_TEXT_MAX_LENGTH).required(),
  question: Joi.string().max(INPUT_TEXT_MAX_LENGTH).required(),
  words: Joi.array().required(),
});

export const updateListeningValidator = Joi.object({
  lesson: Joi.isObjectId().optional(),
  type: Joi.string()
    .valid(...Object.values(ListeningType))
    .optional(),
  answer: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
  rawAnswer: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
  question: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
  words: Joi.array().optional(),
});

export const listeningFilterValidator = Joi.object({
  ...baseFilterSchema,
  lessonId: IdObjectSchema.required(),
});
