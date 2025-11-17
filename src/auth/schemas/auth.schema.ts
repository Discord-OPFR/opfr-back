import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop({ required: true, unique: true })
  userId!: string;

  @Prop({ required: true })
  token!: string;

  @Prop({ required: true })
  refreshToken!: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
