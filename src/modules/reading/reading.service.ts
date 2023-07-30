import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionName, OrderDirection } from '@src/commons/constants';
import { FilterQuery } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { LessonService } from '../lesson/lesson.service';
import { Reading, ReadingDocument } from './entities/reading.entity';
import { ICreateReading, IUpdateReading } from './reading.interface';

@Injectable()
export class ReadingService {
  constructor(
    @InjectModel(CollectionName.READINGS)
    private model: SoftDeleteModel<ReadingDocument>,
    private readonly lessonService: LessonService,
  ) {}
  async create(createReadingDto: ICreateReading) {
    const lesson = await this.lessonService.findOne(
      createReadingDto.lesson.toString(),
    );
    if (!lesson) {
      throw new UnauthorizedException('Thông tin không hợp lệ (lesson)');
    }
    return await this.model.create(createReadingDto);
  }

  async findAll(query: any) {
    try {
      const { page, limit, orderBy, orderDirection, keyword, lessonId } = query;
      const filterOptions: FilterQuery<Reading> = {};

      if (lessonId || keyword) {
        filterOptions.$and = [];
      }

      if (lessonId) {
        filterOptions.$and.push({
          lesson: lessonId,
        });
      }

      if (keyword) {
        filterOptions.$and.push({
          $or: [
            {
              word: { $regex: new RegExp(keyword, 'i') },
            },
          ],
        });
      }

      const sortOptions = {};
      if (orderBy) {
        sortOptions[orderBy] = orderDirection === OrderDirection.DESC ? -1 : 1;
      }
      const readings = await this.model
        .find(filterOptions)
        .skip(page)
        .limit(limit)
        .sort(sortOptions);

      const total = await this.model.find(filterOptions).count();

      return [readings, total];
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    return await this.model.findById(id);
  }

  async update(id: string, updateReadingDto: IUpdateReading) {
    const reading = await this.model.findByIdAndUpdate(id, updateReadingDto, {
      new: true,
      runValidators: true,
    });
    return reading;
  }

  async remove(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}
