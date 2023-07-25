import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionName, OrderDirection } from '@src/commons/constants';
import { SoftDeleteModel } from 'mongoose-delete';
import { IFilterBase } from '@src/commons/interfaces/common.interface';
import { FilterQuery } from 'mongoose';
import { IUpdateUser } from './user.interface';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(CollectionName.USERS)
    private model: SoftDeleteModel<UserDocument>,
  ) {}
  async create(createUserDto) {
    const createdUser = new this.model(createUserDto);
    return await createdUser.save();
  }

  async findAll(query: IFilterBase) {
    const { page, limit, orderBy, orderDirection, keyword } = query;
    const filterOptions: FilterQuery<User> = {};
    if (keyword) {
      filterOptions.$and = [];
    }
    if (keyword) {
      filterOptions.$and.push({
        $or: [
          {
            username: { $regex: new RegExp(keyword, 'i') },
          },
          {
            email: { $regex: new RegExp(keyword, 'i') },
          },
        ],
      });
    }
    const sortOptions = {};
    if (orderBy) {
      sortOptions[orderBy] = orderDirection === OrderDirection.DESC ? -1 : 1;
    }

    const users = await this.model
      .find(filterOptions)
      .skip(page)
      .limit(limit)
      .sort(sortOptions)
      .select('_id type name title');

    return users;
  }

  async findOne(id: string) {
    try {
      const user = await this.model.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, body: IUpdateUser) {
    try {
      const user = await this.model.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const removedUser = await this.model.deleteById(id);
      return removedUser;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.model
        .findOne({ email })
        .select('_id username email role password')
        .lean();
    } catch (error) {
      throw error;
    }
  }
}
