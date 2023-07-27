import { ListeningType } from './listening.constant';
import { IFilterBase } from '@src/commons/interfaces/common.interface';

export interface ICreateListening {
  type: ListeningType;
  lesson: string;
  answer: string;
  question: string;
  words: Array<string>;
  rawAnswer: string;
}

export interface IUpdateListening {
  type?: ListeningType;
  lesson?: string;
  answer?: string;
  question?: string;
  words?: Array<string>;
  rawAnswer?: string;
}

export interface IListeningFilter extends IFilterBase {
  type?: ListeningType;
  lessonId: string;
}
