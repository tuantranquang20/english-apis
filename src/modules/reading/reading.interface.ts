import { type ObjectId } from 'mongoose';

export interface ICreateReading {
  lesson: ObjectId;
  image: string;
  pronunciation: string;
  translateWord: string;
  word: string;
}
export interface IUpdateReading {
  lesson?: ObjectId;
  image?: string;
  pronunciation?: string;
  translateWord?: string;
  word?: string;
}
