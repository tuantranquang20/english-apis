import { Prop } from '@nestjs/mongoose';

export class BaseSchema {
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
