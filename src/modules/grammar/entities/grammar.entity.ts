import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

@Schema({ timestamps: true, collection: CollectionName.GRAMMARS })
export class Grammar extends BaseSchema {
  id: ObjectId;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: CollectionName.LESSONS,
  })
  lesson: mongoose.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  know: string[];

  @Prop({ required: true, type: [UseSchema] })
  use: Use[];

  @Prop()
  image: string;
}

export type GrammarDocument = HydratedDocument<Grammar>;

export const GrammarSchema = SchemaFactory.createForClass(Grammar);
GrammarSchema.plugin(MongooseDelete, {
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});
