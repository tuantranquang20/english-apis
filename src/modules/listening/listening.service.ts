import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionName, OrderDirection } from '@src/commons/constants';
import { FilterQuery } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { LessonService } from '../lesson/lesson.service';
import { ListeningDocument, Listening } from './entities/listening.entity';
import {
  ICreateListening,
  IListeningFilter,
  IUpdateListening,
} from './listening.interface';

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

  async findAll(query: IListeningFilter) {
    try {
      const { type, page, limit, orderBy, orderDirection, keyword, lessonId } =
        query;
      const filterOptions: FilterQuery<Listening> = {};

      if (type || keyword || lessonId) {
        filterOptions.$and = [];
      }

      if (lessonId) {
        filterOptions.$and.push({
          lesson: lessonId,
        });
      }
      if (type) {
        filterOptions.$and.push({
          lesson: lessonId,
        });
      }
      if (keyword) {
        filterOptions.$and.push({
          $or: [
            {
              question: { $regex: new RegExp(keyword, 'i') },
            },
          ],
        });
      }
      const sortOptions = {};
      if (orderBy) {
        sortOptions[orderBy] = orderDirection === OrderDirection.DESC ? -1 : 1;
      }
      const listenings = await this.model
        .find(filterOptions)
        .skip(page)
        .limit(limit)
        .sort(sortOptions);
      const total = await this.model.find(filterOptions).count();
      return [listenings, total];
    } catch (error) {
      throw error;
    }
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

  async remove(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}
