import { LessonType } from './lesson.constant';

export interface ICreateLesson {
  type: LessonType;
  name: string;
  title: string;
}
