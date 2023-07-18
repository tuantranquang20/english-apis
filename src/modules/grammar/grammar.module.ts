import { Module } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { GrammarController } from './grammar.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionName } from 'src/commons/constants';
import { GrammarSchema } from './entities/grammar.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CollectionName.GRAMMARS, schema: GrammarSchema },
    ]),
  ],
  controllers: [GrammarController],
  providers: [GrammarService],
  exports: [GrammarService],
})
export class GrammarModule {}
