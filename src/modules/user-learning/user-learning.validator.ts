import { MAX_PERCENTAGE } from '@src/commons/constants';
import Joi from '@src/commons/plugins/joi';
import { IdObjectSchema } from '@src/commons/utils/validator';
import { LessonType } from '../lesson/lesson.constant';

export const createUserLearningValidator = Joi.object({
  lessonId: IdObjectSchema.required(),
  percentage: Joi.number().max(MAX_PERCENTAGE).required(),
  type: Joi.string()
    .valid(...Object.values(LessonType))
    .optional(),
});
