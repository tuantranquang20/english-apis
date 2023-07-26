import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, type ObjectId } from 'mongoose';
import * as MongooseDelete from 'mongoose-delete';
import { CollectionName } from 'src/commons/constants';
import { BaseSchema } from 'src/commons/schema/base.schema';
import { ListeningType } from '../listening.constant';
@Schema({ timestamps: true, collection: CollectionName.LISTENINGS })
export class Listening extends BaseSchema {
  id: ObjectId;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: CollectionName.LESSONS,
  })
  lesson: mongoose.Types.ObjectId;

  @Prop({ required: true })
  answer: string;

  @Prop({ required: true })
  rawAnswer: string;

  @Prop({ required: true })
  question: string;

  @Prop({ enum: ListeningType, required: true })
  type: ListeningType;

  @Prop({ required: true })
  words: Array<string>;
}
export type ListeningDocument = HydratedDocument<Listening>;

export const ListeningSchema = SchemaFactory.createForClass(Listening);
ListeningSchema.plugin(MongooseDelete, {
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});
