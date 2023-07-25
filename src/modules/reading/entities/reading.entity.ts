import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, type ObjectId } from 'mongoose';
import * as MongooseDelete from 'mongoose-delete';
import { CollectionName } from 'src/commons/constants';
import { BaseSchema } from 'src/commons/schema/base.schema';
@Schema({ timestamps: true, collection: CollectionName.READINGS })
export class Reading extends BaseSchema {
  id: ObjectId;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: CollectionName.LESSONS,
  })
  lesson: mongoose.Types.ObjectId;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  pronunciation: string;

  @Prop({ required: true })
  translateWord: string;

  @Prop({ required: true })
  word: string;
}
export type ReadingDocument = HydratedDocument<Reading>;

export const ReadingSchema = SchemaFactory.createForClass(Reading);
ReadingSchema.plugin(MongooseDelete, {
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});
