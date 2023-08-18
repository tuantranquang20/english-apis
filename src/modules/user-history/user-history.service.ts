import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionName } from '@src/commons/constants';
import { SoftDeleteModel } from 'mongoose-delete';
import { UserHistoryDocument } from './entities/user-history.entity';
import { ICreateUserHistory } from './user-history.interface';

@Injectable()
export class UserHistoryService {
  constructor(
    @InjectModel(CollectionName.USER_HISTORIES)
    private model: SoftDeleteModel<UserHistoryDocument>,
  ) {}

  async create(body: ICreateUserHistory) {
    try {
      const userHistory = { ...body, user: body.userId };
      delete userHistory.userId;

      const newUserHistory = await this.model.create(userHistory);
      return newUserHistory;
    } catch (error) {
      throw error;
    }
  }
}
