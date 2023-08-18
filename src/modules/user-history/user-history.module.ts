import { Module } from '@nestjs/common';
import { UserHistoryService } from './user-history.service';
import { UserHistoryController } from './user-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionName } from '@src/commons/constants';
import { UserHistorySchema } from './entities/user-history.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CollectionName.USER_HISTORIES, schema: UserHistorySchema },
    ]),
  ],
  controllers: [UserHistoryController],
  providers: [UserHistoryService, JwtService],
  exports: [UserHistoryService],
})
export class UserHistoryModule {}
