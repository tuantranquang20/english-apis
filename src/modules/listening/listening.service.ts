import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionName } from '@src/commons/constants';
import { SoftDeleteModel } from 'mongoose-delete';
import { LessonService } from '../lesson/lesson.service';
import { ListeningDocument } from './entities/listening.entity';
import { ICreateListening, IUpdateListening } from './listening.interface';

@Injectable()
export class ListeningService {
  constructor(
    @InjectModel(CollectionName.LISTENINGS)
    private model: SoftDeleteModel<ListeningDocument>,
    private readonly lessonService: LessonService,
  ) {}
  async create(createListeningDto: ICreateListening) {
    const lesson = await this.lessonService.findOne(
      createListeningDto.lesson.toString(),
    );
    if (!lesson) {
      throw new UnauthorizedException('Thông tin không hợp lệ (lesson)');
    }
    return await this.model.create(createListeningDto);
  }

  async findAll() {
    return await this.model.find();
  }

  async findOne(id: string) {
    return await this.model.findById(id);
  }

  async update(id: string, updateListeningDto: IUpdateListening) {
    const listening = await this.model.findByIdAndUpdate(
      id,
      updateListeningDto,
      {
        new: true,
        runValidators: true,
      },
    );
    return listening;
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
