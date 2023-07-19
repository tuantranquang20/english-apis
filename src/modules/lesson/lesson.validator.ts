import { INPUT_TEXT_MAX_LENGTH } from '@src/commons/constants';
import Joi from '@src/commons/plugins/joi';
import { LessonType } from './lesson.constant';

export const createCourseSchema = Joi.object({
  type: Joi.string()
    .valid(...Object.values(LessonType))
    .required(),
  name: Joi.string().max(INPUT_TEXT_MAX_LENGTH).required(),
  title: Joi.string().max(INPUT_TEXT_MAX_LENGTH).required(),
});
