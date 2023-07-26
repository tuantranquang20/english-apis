import { Module } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionName } from '@src/commons/constants';
import { ReadingSchema } from './entities/reading.entity';
import { LessonModule } from '../lesson/lesson.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CollectionName.READINGS, schema: ReadingSchema },
    ]),
    LessonModule,
  ],
  controllers: [ReadingController],
  providers: [ReadingService],
})
export class ReadingModule {}
