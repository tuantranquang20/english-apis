import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { CollectionName } from '@src/commons/constants';
import { BaseSchema } from 'src/commons/schema/base.schema';
import { HydratedDocument, ObjectId } from 'mongoose';
import * as MongooseDelete from 'mongoose-delete';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true, collection: CollectionName.USERS })
export class User extends BaseSchema {
  id: ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, enum: ['user', 'admin'], default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(MongooseDelete, {
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});

// Hàm middleware để mã hóa mật khẩu trước khi lưu vào MongoDB
UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});
