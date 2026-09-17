import { model, Schema } from 'mongoose'

export interface User {
  name: string
  email: string
  avatar?: string
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    avatar: { type: String, trim: true },
  },
  { timestamps: true },
)

export const UserModel = model<User>('User', userSchema)