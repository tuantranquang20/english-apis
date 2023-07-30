import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionName } from '@src/commons/constants';
import { SoftDeleteModel } from 'mongoose-delete';
import { UserLearningDocument } from './entities/user-learning.entity';
import {
  ICreateUserLearning,
} from './user-learning.interface';

@Injectable()
export class UserLearningService {
  constructor(
    @InjectModel(CollectionName.USER_LEARNINGS)
    private model: SoftDeleteModel<UserLearningDocument>,
  ) {}
  async create(body: ICreateUserLearning) {
    try {
      const userLearning = await this.model.findOne({
        user: body.userId,
        lesson: body.lessonId,
        type: body.type,
      });
      let result = {};
      if (userLearning) {
        result = await this.model.findByIdAndUpdate(
          userLearning?.id,
          {
            user: body.userId,
            lesson: body.lessonId,
            type: body.type,
            percentage: body.percentage,
          },
          {
            new: true,
            runValidators: true,
          },
        );
      } else {
        result = await this.model.create({
          user: body.userId,
          lesson: body.lessonId,
          type: body.type,
          percentage: body.percentage,
        });
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}
