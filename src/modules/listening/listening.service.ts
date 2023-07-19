import { Injectable } from '@nestjs/common';

@Injectable()
export class ListeningService {
  create(createListeningDto) {
    return 'This action adds a new listening';
  }

  findAll() {
    return `This action returns all listening`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listening`;
  }

  update(id: number, updateListeningDto) {
    return `This action updates a #${id} listening`;
  }

  remove(id: number) {
    return `This action removes a #${id} listening`;
  }
}
