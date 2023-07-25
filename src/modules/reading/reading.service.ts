import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionName } from '@src/commons/constants';
import { SoftDeleteModel } from 'mongoose-delete';
import { LessonService } from '../lesson/lesson.service';
import { ReadingDocument } from './entities/reading.entity';
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

  async findAll() {
    return await this.model.find();
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

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
