import { Injectable } from '@nestjs/common';

@Injectable()
export class ReadingService {
  create(createReadingDto) {
    return 'This action adds a new reading';
  }

  findAll() {
    return `This action returns all reading`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reading`;
  }

  update(id: number, updateReadingDto) {
    return `This action updates a #${id} reading`;
  }

  remove(id: number) {
    return `This action removes a #${id} reading`;
  }
}
