import { Injectable } from '@nestjs/common';
import { CreateUserLearningDto } from './dto/create-user-learning.dto';
import { UpdateUserLearningDto } from './dto/update-user-learning.dto';

@Injectable()
export class UserLearningService {
  create(createUserLearningDto: CreateUserLearningDto) {
    return 'This action adds a new userLearning';
  }

  findAll() {
    return `This action returns all userLearning`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userLearning`;
  }

  update(id: number, updateUserLearningDto: UpdateUserLearningDto) {
    return `This action updates a #${id} userLearning`;
  }

  remove(id: number) {
    return `This action removes a #${id} userLearning`;
  }
}
