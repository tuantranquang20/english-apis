import { Injectable } from '@nestjs/common';
import { UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionName } from '@src/commons/constants';
import { SoftDeleteModel } from 'mongoose-delete';
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

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findByEmail(email: string) {
    return this.model.findOne({ email }).exec();
  }
}
