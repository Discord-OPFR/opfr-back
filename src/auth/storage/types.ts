export interface Auth {
  userId: string;
  username: string;
  refreshToken: string;
}

export interface AuthDocument extends Document, Auth {}
