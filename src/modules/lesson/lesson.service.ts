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

  async findAll(query: ILessonFilter) {
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
        .find(filterOptions)
        .skip(page)
        .limit(limit)
        .sort(sortOptions)
        .select('_id type name title');
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
}
