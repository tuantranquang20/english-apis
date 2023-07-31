import { INPUT_TEXT_MAX_LENGTH } from '@src/commons/constants';
import Joi from '@src/commons/plugins/joi';
import { LessonType } from './lesson.constant';
import { baseFilterSchema } from '@src/commons/utils/validator';

export const createCourseValidator = Joi.object({
  type: Joi.string()
    .valid(...Object.values(LessonType))
    .required(),
  name: Joi.string().max(INPUT_TEXT_MAX_LENGTH).required(),
  title: Joi.string().max(INPUT_TEXT_MAX_LENGTH).required(),
});

export const updateCourseValidator = Joi.object({
  name: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
  title: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
});

export const lessonFilterValidator = Joi.object({
  ...baseFilterSchema,
  type: Joi.string()
    .valid(...Object.values(LessonType))
    .required(),
});
