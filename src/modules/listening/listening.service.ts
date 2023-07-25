import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionName } from '@src/commons/constants';
import { SoftDeleteModel } from 'mongoose-delete';
import { ListeningDocument } from './entities/listening.entity';

@Injectable()
export class ListeningService {
  constructor(
    @InjectModel(CollectionName.LISTENINGS)
    private model: SoftDeleteModel<ListeningDocument>,
  ) {}
  async create(createListeningDto) {
    try {
      return 'This action adds a new listening';
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return `This action returns all listening`;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return `This action returns a #${id} listening`;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateListeningDto) {
    try {
      return `This action updates a #${id} listening`;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return `This action removes a #${id} listening`;
    } catch (error) {
      throw error;
    }
  }
}
