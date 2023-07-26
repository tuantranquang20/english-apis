import { ListeningType } from './listening.constant';
import { IFilterBase } from '@src/commons/interfaces/common.interface';

export interface ICreateListening {
  type: ListeningType;
  lesson: string;
  answer: string;
  titquestionle: string;
  words: Array<string>;
}

export interface IUpdateListening {
  type?: ListeningType;
  lesson?: string;
  answer?: string;
  titquestionle?: string;
  words?: Array<string>;
}

export interface IListeningFilter extends IFilterBase {
  type?: ListeningType;
}
