import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class BaseSchema extends Document {
  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  deletedBy?: string;

  @Prop()
  deletedAt?: Date;

  createdAt: Date;

  updatedAt: Date;
}
