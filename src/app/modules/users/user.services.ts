// Config
import config from '../../../config';
// Models
import { User } from './user.model';
// Interfaces
import { IUser } from './user.interface';
// Utils
import { generateUserId } from './user.utils';
import ApiError from '../../../errors/ApiErrors';
import { ENUM_USER_ROLES } from '../../../enums/users';

const createUser = async (user: IUser): Promise<IUser | null> => {
  console.log(user);
  const id = await generateUserId();
  console.log(id);
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

const getLastStudentUser = async () => {
  const lastUser = await User.findOne(
    { role: ENUM_USER_ROLES.STUDENT },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id;
};
const getLastAdminUser = async () => {
  const lastUser = await User.findOne(
    { role: ENUM_USER_ROLES.ADMIN },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id;
};
const getLastFacultyUser = async () => {
  const lastUser = await User.findOne(
    { role: ENUM_USER_ROLES.FACULTY },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id;
};

export const UserService = {
  createUser,
  getLastStudentUser,
  getLastAdminUser,
  getLastFacultyUser,
};
