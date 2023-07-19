import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionName, OrderDirection } from '@src/commons/constants';
import {
  ICreateLesson,
  ILessonFilter,
  IUpdateLesson,
} from './lesson.interface';
import { SoftDeleteModel } from 'mongoose-delete';
import { LessonDocument } from './entities/lesson.entity';

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
      const { type, page, limit, orderBy, orderDirection } = query;

      const sortOptions = {};
      if (orderBy) {
        sortOptions[orderBy] = orderDirection === OrderDirection.DESC ? -1 : 1;
      }

      const lessons = await this.model
        .find({
          type,
        })
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
}
