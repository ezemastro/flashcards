import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  id: ObjectId;
  @Prop({ isRequired: true })
  user_name: string;
  @Prop({ isRequired: true })
  email: string;
  @Prop({ isRequired: true })
  password: string;
  @Prop({ default: false })
  email_verified: boolean;
  @Prop()
  code_otp: string;
  @Prop()
  code_op_expired: Date;
  @Prop()
  last_cards: ObjectId[];
  @Prop()
  last_decks: ObjectId[];
  @Prop()
  decks_saved: ObjectId[];
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
