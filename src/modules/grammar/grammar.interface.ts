import { IFilterBase } from '@src/commons/interfaces/common.interface';

export interface ICreateGrammar {
  image: string;
  know: string[];
  title: string;
  use: { ex: string; grammar: string }[];
  lessonId: string;
}

export interface IGrammarFilter extends IFilterBase {
  lessonId: string;
}

export interface IUpdateGrammar {
  image?: string;
  know?: string[];
  title?: string;
  use?: { ex: string; grammar: string }[];
  lessonId?: string;
}
