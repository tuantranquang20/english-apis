import { Module } from '@nestjs/common';
import { ListeningService } from './listening.service';
import { ListeningController } from './listening.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionName } from '@src/commons/constants';
import { ListeningSchema } from './entities/listening.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CollectionName.LISTENINGS, schema: ListeningSchema },
    ]),
  ],
  controllers: [ListeningController],
  providers: [ListeningService],
})
export class ListeningModule {}
