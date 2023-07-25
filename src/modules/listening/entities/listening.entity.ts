import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, type ObjectId } from 'mongoose';
import * as MongooseDelete from 'mongoose-delete';
import { CollectionName, ListeningType } from 'src/commons/constants';
import { BaseSchema } from 'src/commons/schema/base.schema';

export type ListeningDocument = HydratedDocument<Listening>;

@Schema({ timestamps: true, collection: CollectionName.LISTENINGS })
export class Listening extends BaseSchema {
  id: ObjectId;

  @Prop({ enum: ListeningType, required: true })
  type: ListeningType;

  @Prop({ required: true })
  rawAnswer: string;

  @Prop()
  answer: string;

  @Prop({ required: true })
  words: string[];
}

export const ListeningSchema = SchemaFactory.createForClass(Listening);
ListeningSchema.plugin(MongooseDelete, {
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});
