import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, type ObjectId } from 'mongoose';
import * as MongooseDelete from 'mongoose-delete';
import { CollectionName } from 'src/commons/constants';
import { BaseSchema } from 'src/commons/schema/base.schema';

export type GrammarDocument = HydratedDocument<Grammar>;

@Schema({ timestamps: true, collection: CollectionName.GRAMMARS })
export class Grammar extends BaseSchema {
  id: ObjectId;

  @Prop({ required: true })
  name: string;
}

export const GrammarSchema = SchemaFactory.createForClass(Grammar);
GrammarSchema.plugin(MongooseDelete, {
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});
