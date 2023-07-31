import { IFilterBase } from '@src/commons/interfaces/common.interface';
import { type ObjectId } from 'mongoose';

export interface ICreateReading {
  lessonId: ObjectId;
  image: string;
  pronunciation: string;
  translateWord: string;
  word: string;
}
export interface IUpdateReading {
  lessonId?: ObjectId;
  image?: string;
  pronunciation?: string;
  translateWord?: string;
  word?: string;
}

export interface IReadingFilter extends IFilterBase {
  lessonId: string;
}
