import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionName } from '@src/commons/constants';
import { SoftDeleteModel } from 'mongoose-delete';
import { UserLearningDocument } from './entities/user-learning.entity';
import {
  ICreateUserLearning,
  IUpdateUserLearning,
} from './user-learning.interface';

@Injectable()
export class UserLearningService {
  constructor(
    @InjectModel(CollectionName.USER_LEARNINGS)
    private model: SoftDeleteModel<UserLearningDocument>,
  ) {}
  async create(body: ICreateUserLearning) {
    try {
      const result = await this.model.create({
        user: body.userId,
        lesson: body.lessonId,
        type: body.type,
        percentage: body.percentage,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, body: IUpdateUserLearning) {
    try {
      const userLearning = await this.model.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      return userLearning;
    } catch (error) {
      throw error;
    }
  }
}
