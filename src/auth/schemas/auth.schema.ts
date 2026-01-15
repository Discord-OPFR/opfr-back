import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

export enum ERROR_TYPES {
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  REFRESH_EXPIRED = 'REFRESH_EXPIRED',
  NO_TOKEN = 'NO_TOKEN',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
}

export interface CachedMember {
  odId: string;
  username: string;
  avatar: string | null;
  cachedAt: Date;
}

@Schema()
export class Auth {
  @Prop({ required: true, unique: true })
  userId!: string;

  @Prop({ required: true, type: Object })
  discordToken!: {
    iv: string;
    authTag: string;
    value: string;
  };

  @Prop({ required: true })
  refreshToken!: string;

  @Prop({ type: Object })
  cachedMember?: CachedMember;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
