// Types
import { RequestHandler } from 'express-serve-static-core';

// Services
import { UserService } from './user.services';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await UserService.createUser(user);

    res.status(200).json({
      sucess: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
};
