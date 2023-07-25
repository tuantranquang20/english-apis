export enum CollectionName {
  USERS = 'users',
  LESSONS = 'lessons',
  GRAMMARS = 'grammars',
  LISTENINGS = 'listenings',
  READINGS = 'lessons',
  USER_LEARNINGS = 'user_learnings',
}

export const MAX_INTEGER = 2147483647;
export const INPUT_TEXT_MAX_LENGTH = 255;
export const LIMIT_PER_PAGE_DEFAULT = 10;
export const MAX_PERCENTAGE = 100;

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export enum ListeningType {
  SELECT_CELL = 'selectCell',
  SELECT_WORD = 'selectWord',
}
