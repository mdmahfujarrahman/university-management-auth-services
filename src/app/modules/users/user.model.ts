import { Schema, model, Model } from 'mongoose'

// types
import { IUser } from './user.interface'

// type UserModel = Model<IUser>
type UserModel = Model<IUser, object>

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
)

export const User = model<IUser, UserModel>('User', userSchema)
