import { Schema, model } from 'mongoose';

// types
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const User = model<IUser, UserModel>('User', userSchema);
