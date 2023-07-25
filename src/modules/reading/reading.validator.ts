import { INPUT_TEXT_MAX_LENGTH } from '@src/commons/constants';
import Joi from '@src/commons/plugins/joi';

export const createReadingValidator = Joi.object({
  lesson: Joi.isObjectId().required(),
  image: Joi.string().required(),
  pronunciation: Joi.string().max(INPUT_TEXT_MAX_LENGTH).required(),
  translateWord: Joi.string().max(INPUT_TEXT_MAX_LENGTH).required(),
  word: Joi.string().max(INPUT_TEXT_MAX_LENGTH).required(),
});

export const updateReadingValidator = Joi.object({
  lesson: Joi.isObjectId().optional(),
  image: Joi.string().optional(),
  pronunciation: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
  translateWord: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
  word: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
});
