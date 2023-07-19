import { Injectable } from '@nestjs/common';

@Injectable()
export class UserLearningService {
  create(createUserLearningDto) {
    return 'This action adds a new userLearning';
  }

  findAll() {
    return `This action returns all userLearning`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userLearning`;
  }

  update(id: number, updateUserLearningDto) {
    return `This action updates a #${id} userLearning`;
  }

  remove(id: number) {
    return `This action removes a #${id} userLearning`;
  }
}
