import { LessonType } from '../lesson/lesson.constant';

export interface ICreateUserLearning {
  userId: string;
  lessonId: string;
  percentage: string;
  type: LessonType;
}
export interface IUpdateUserLearning {
  percentage: string;
}
