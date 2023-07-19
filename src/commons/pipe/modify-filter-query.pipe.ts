import { PipeTransform, Injectable } from '@nestjs/common';
import { LIMIT_PER_PAGE_DEFAULT, OrderDirection } from '../constants';

@Injectable()
export class ModifyFilterQueryPipe implements PipeTransform {
  constructor() {
    //
  }
  transform(query: Record<string, unknown>) {
    if (!query.page) {
      query.page = 1;
    }
    if (!query.limit) {
      query.limit = LIMIT_PER_PAGE_DEFAULT;
    }
    Object.keys(query).forEach((key) => {
      if (query[key] === 'null') {
        query[key] = null;
      }
      if (query[key] === 'true') {
        query[key] = true;
      }
      if (query[key] === 'false') {
        query[key] = false;
      }
    });
    if (!query.orderBy) {
      query.orderBy = 'createdAt';
    }
    if (!query.orderDirection) {
      query.orderDirection = OrderDirection.DESC;
    }
    return {
      ...(query as Record<string, unknown>),
      page: (Number(query.page) - 1) * Number(query.limit),
      limit: Number(query.limit),
    };
  }
}
