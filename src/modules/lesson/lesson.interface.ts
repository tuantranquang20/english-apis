import { IFilterBase } from '@src/commons/interfaces/common.interface';
import { LessonType } from './lesson.constant';

export interface ICreateLesson {
  type: LessonType;
  name: string;
  title: string;
}

export interface IUpdateLesson {
  type?: LessonType;
  name?: string;
  title?: string;
}

export interface ILessonFilter extends IFilterBase {
  type?: LessonType;
}
