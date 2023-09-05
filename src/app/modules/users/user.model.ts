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

// userSchema.pre('save', async function (next: NextFunction) {
//   if (!this.isModified('password')) return next()
//   this.password = await bcrypt.hash(this.password, 12)
//   next()
// })

export const User = model<IUser, UserModel>('User', userSchema)
