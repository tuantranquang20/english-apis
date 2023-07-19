import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionName } from '@src/commons/constants';
import { LessonSchema } from './entities/lesson.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CollectionName.LESSONS, schema: LessonSchema },
    ]),
  ],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
