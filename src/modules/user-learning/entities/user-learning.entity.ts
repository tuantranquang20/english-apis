// export class userLearning {
//   userId: 'userId';
//   lessonId: 'lessonId';
//   percentage: '100';
// }
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LessonType } from '@src/modules/lesson/lesson.constant';
import mongoose, { HydratedDocument, type ObjectId } from 'mongoose';
import * as MongooseDelete from 'mongoose-delete';
import { CollectionName } from 'src/commons/constants';
import { BaseSchema } from 'src/commons/schema/base.schema';

@Schema()
export class Use {
  @Prop()
  ex: string;

  @Prop()
  grammar: string;
}
export const UseSchema = SchemaFactory.createForClass(Use);

@Schema({ timestamps: true, collection: CollectionName.USER_LEARNINGS })
export class UserLearning extends BaseSchema {
  id: ObjectId;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: CollectionName.USERS,
  })
  user: mongoose.Types.ObjectId;

  @Prop()
  type: LessonType;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: CollectionName.LESSONS,
  })
  lesson: mongoose.Types.ObjectId;

  @Prop({ default: 0 })
  percentage: number;
}

export type UserLearningDocument = HydratedDocument<UserLearning>;

export const UserLearningSchema = SchemaFactory.createForClass(UserLearning);
UserLearningSchema.plugin(MongooseDelete, {
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});
