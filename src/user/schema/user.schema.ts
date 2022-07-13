import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
// import {Game} from '';
// import {Group} from '';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true, minlength: 5, maxlength: 16 })
  username: string;

  // TODO add password max length validation (not here specifically) to accomodate for max hash size with bcrypt
  @Prop({ required: true, minlength: 5 })
  password: string;

  @Prop()
  avatar?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }] })
  games?: Game[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  friends?: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }] })
  groups?: Group[];
}

export const UserSchema = SchemaFactory.createForClass(User);
