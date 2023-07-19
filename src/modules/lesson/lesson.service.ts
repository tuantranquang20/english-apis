import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionName } from '@src/commons/constants';
import { Model } from 'mongoose';
import { Lesson } from './entities/lesson.entity';
import { ICreateLesson } from './lesson.interface';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(CollectionName.LESSONS) private model: Model<Lesson>,
  ) {}
  async create(createLessonDto: ICreateLesson) {
    try {
      const newLesson = await this.model.create(createLessonDto);
      return newLesson;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all lesson`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
