import { Module } from '@nestjs/common';
import { UserLearningService } from './user-learning.service';
import { UserLearningController } from './user-learning.controller';

@Module({
  controllers: [UserLearningController],
  providers: [UserLearningService],
})
export class UserLearningModule {}
