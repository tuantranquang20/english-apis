import { Injectable } from '@nestjs/common';

@Injectable()
export class GrammarService {
  create(createGrammarDto) {
    return 'This action adds a new grammar';
  }

  findAll() {
    return `This action returns all grammar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} grammar`;
  }

  update(id: number, updateGrammarDto) {
    return `This action updates a #${id} grammar`;
  }

  remove(id: number) {
    return `This action removes a #${id} grammar`;
  }
}
