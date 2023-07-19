import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, type ObjectId } from 'mongoose';
import * as MongooseDelete from 'mongoose-delete';
import { CollectionName } from 'src/commons/constants';
import { BaseSchema } from 'src/commons/schema/base.schema';
import { LessonType } from '../lesson.constant';

export type LessonDocument = HydratedDocument<Lesson>;

@Schema({ timestamps: true, collection: CollectionName.LESSONS })
export class Lesson extends BaseSchema {
  id: ObjectId;

  @Prop({ type: [{ type: String, enum: LessonType }], required: true })
  type: LessonType;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  title: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
LessonSchema.plugin(MongooseDelete, {
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});
