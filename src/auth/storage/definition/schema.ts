import { Schema } from 'mongoose';

const authSchema = new Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  refreshToken: { type: String, required: true },
});

export { authSchema };
