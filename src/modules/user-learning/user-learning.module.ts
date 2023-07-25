import { Module } from '@nestjs/common';
import { UserLearningService } from './user-learning.service';
import { UserLearningController } from './user-learning.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionName } from '@src/commons/constants';
import { UserLearningSchema } from './entities/user-learning.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CollectionName.USER_LEARNINGS, schema: UserLearningSchema },
    ]),
  ],
  controllers: [UserLearningController],
  providers: [UserLearningService],
})
export class UserLearningModule {}
