import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, type ObjectId } from 'mongoose';
import * as MongooseDelete from 'mongoose-delete';
import { CollectionName } from 'src/commons/constants';
import { BaseSchema } from 'src/commons/schema/base.schema';
import { UserHistoryType } from '../user-history.constant';

@Schema({ timestamps: true, collection: CollectionName.USER_HISTORIES })
export class UserHistory extends BaseSchema {
  id: ObjectId;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: CollectionName.USERS,
  })
  user: mongoose.Types.ObjectId;

  @Prop({ required: true, type: String, enum: UserHistoryType })
  type: string;

  @Prop({ required: true })
  value: string;
}

export type UserHistoryDocument = HydratedDocument<UserHistory>;

export const UserHistorySchema = SchemaFactory.createForClass(UserHistory);
UserHistorySchema.plugin(MongooseDelete, {
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});
