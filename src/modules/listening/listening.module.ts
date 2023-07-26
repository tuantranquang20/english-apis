import { Module } from '@nestjs/common';
import { ListeningService } from './listening.service';
import { ListeningController } from './listening.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonModule } from '../lesson/lesson.module';
import { CollectionName } from '@src/commons/constants';
import { ListeningSchema } from './entities/listening.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CollectionName.LISTENINGS, schema: ListeningSchema },
    ]),
    LessonModule,
  ],
  controllers: [ListeningController],
  providers: [ListeningService],
})
export class ListeningModule {}
