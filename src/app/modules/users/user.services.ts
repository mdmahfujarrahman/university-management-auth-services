// Config
import config from '../../../config';
// Models
import { User } from './user.model';
// Interfaces
import { IUser } from './user.interface';
// Utils
import { generateUserId } from './user.utils';
import ApiError from '../../../errors/ApiErrors';

const createUser = async (user: IUser): Promise<IUser | null> => {
  console.log(user);
  const id = await generateUserId();
  user.id = id;
  if (!user.password) {
    user.password = config.default_user_password as string;
  }
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user');
  }
  return createdUser;
};

const getLastUser = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id;
};

export const UserService = {
  createUser,
  getLastUser,
};
