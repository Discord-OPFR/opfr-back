import { type Model, model, models } from 'mongoose';

import { AuthDocument } from '../types';
import { authSchema } from './schema';

export const authModel: Model<AuthDocument> =
  models?.Auth || model<AuthDocument>('Auth', authSchema);
