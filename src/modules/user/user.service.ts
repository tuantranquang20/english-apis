import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionName, OrderDirection } from '@src/commons/constants';
import { SoftDeleteModel } from 'mongoose-delete';
import { IFilterBase } from '@src/commons/interfaces/common.interface';
import { FilterQuery, PipelineStage } from 'mongoose';
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

    const matchStage: FilterQuery<User> = {};
    if (keyword) {
      matchStage.$or = [
        { username: { $regex: new RegExp(keyword, 'i') } },
        { email: { $regex: new RegExp(keyword, 'i') } },
      ];
    }

    const sortStage = {};
    if (orderBy) {
      sortStage[orderBy] = orderDirection === OrderDirection.DESC ? -1 : 1;
    }

    const pipeline = [
      {
        $addFields: {
          id: { $toString: '$_id' },
        },
      },
      { $match: matchStage },
      { $sort: sortStage },
      { $skip: page * limit },
      { $limit: limit },
      {
        $project: {
          id: 1,
          role: 1,
          username: 1,
          email: 1,
        },
      },
      {
        $lookup: {
          from: CollectionName.USER_HISTORIES,
          localField: 'id',
          foreignField: 'user',
          as: 'userHistories',
          pipeline: [
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $project: {
                type: 1,
                value: 1,
                _id: 0,
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: null,
          users: { $push: '$$ROOT' },
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          users: { $slice: ['$users', page, limit] },
          total: 1,
        },
      },
    ] as PipelineStage[];

    const result = await this.model.aggregate(pipeline);

    const users = result[0]?.users?.map((item) => {
      const result = item?.userHistories?.reduce((acc, el) => {
        const type = el?.type;
        if (!acc[type]) {
          acc[type] = { type, values: [] };
        }
        acc[type]?.values.push(el?.value);
        return acc;
      }, {});

      return {
        ...item,
        userHistories: Object.values(result),
      };
    });

    const total = result[0]?.total || 0;

    return [users, total];
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
