import { Injectable } from '@nestjs/common';
import {
  ICreateGrammar,
  IGrammarFilter,
  IUpdateGrammar,
} from './grammar.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionName, OrderDirection } from '@src/commons/constants';
import { SoftDeleteModel } from 'mongoose-delete';
import { Grammar, GrammarDocument } from './entities/grammar.entity';
import { FilterQuery } from 'mongoose';

@Injectable()
export class GrammarService {
  constructor(
    @InjectModel(CollectionName.GRAMMARS)
    private model: SoftDeleteModel<GrammarDocument>,
  ) {}

  async create(body: ICreateGrammar) {
    try {
      const grammar = { ...body, lesson: body.lessonId };
      delete grammar.lessonId;

      const newGrammar = await this.model.create(grammar);
      return newGrammar;
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: IGrammarFilter) {
    try {
      const { page, limit, orderBy, orderDirection, keyword, lessonId } = query;
      const filterOptions: FilterQuery<Grammar> = {};
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
      const grammars = await this.model
        .find(filterOptions)
        .skip(page)
        .limit(limit)
        .sort(sortOptions)
        .select('_id use know title');

      const total = await this.model.find(filterOptions).count();

      return [grammars, total];
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, body: IUpdateGrammar) {
    try {
      const grammar = await this.model.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      return grammar;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const removedGrammar = await this.model.deleteById(id);
      return removedGrammar;
    } catch (error) {
      throw error;
    }
  }
}
