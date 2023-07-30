import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionName, OrderDirection } from '@src/commons/constants';
import {
  ICreateLesson,
  ILessonFilter,
  IUpdateLesson,
} from './lesson.interface';
import { SoftDeleteModel } from 'mongoose-delete';
import { Lesson, LessonDocument } from './entities/lesson.entity';
import { FilterQuery } from 'mongoose';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(CollectionName.LESSONS)
    private model: SoftDeleteModel<LessonDocument>,
  ) {}
  async create(createLessonDto: ICreateLesson) {
    try {
      const newLesson = await this.model.create(createLessonDto);
      return newLesson;
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: ILessonFilter, userId: string) {
    try {
      const { type, page, limit, orderBy, orderDirection, keyword } = query;
      const filterOptions: FilterQuery<Lesson> = {};
      if (type || keyword) {
        filterOptions.$and = [];
      }
      if (type) {
        filterOptions.$and.push({
          type,
        });
      }
      if (keyword) {
        filterOptions.$and.push({
          $or: [
            {
              name: { $regex: new RegExp(keyword, 'i') },
            },
            {
              title: { $regex: new RegExp(keyword, 'i') },
            },
          ],
        });
      }
      const sortOptions = {};
      if (orderBy) {
        sortOptions[orderBy] = orderDirection === OrderDirection.DESC ? -1 : 1;
      }
      const lessons = await this.model
        .aggregate([
          {
            $addFields: {
              id: { $toString: '$_id' },
            },
          },
          {
            $match: filterOptions,
          },
          {
            $lookup: {
              from: CollectionName.USER_LEARNINGS,
              localField: 'id',
              foreignField: 'lesson',
              as: 'userLearning',
              pipeline: [
                {
                  $match: {
                    user: userId,
                  },
                },
              ],
            },
          },
          {
            $unwind: {
              path: '$userLearning',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $addFields: {
              percentage: {
                $cond: {
                  if: { $ifNull: ['$userLearning', 0] },
                  then: '$userLearning.percentage',
                  else: 0,
                },
              },
            },
          },
          {
            $project: {
              userLearning: 0,
              deleted: 0,
              createdAt: 0,
              updatedAt: 0,
              __v: 0,
              id: 0,
            },
          },
        ])
        .skip(page)
        .limit(limit)
        .sort(sortOptions);

      return lessons;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, body: IUpdateLesson) {
    try {
      const lesson = await this.model.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      return lesson;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const removedLesson = await this.model.deleteById(id);
      return removedLesson;
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string) {
    try {
      const lesson = await this.model.findById(id);
      return lesson;
    } catch (error) {
      throw error;
    }
  }
}
