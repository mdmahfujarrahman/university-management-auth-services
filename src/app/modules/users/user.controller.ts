// Types
import { Request, Response } from 'express';
// Services
import { UserService } from './user.services';
// High Order Functions
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body;
  const result = await UserService.createUser(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    success: true,
    data: result,
  });
});

export const UserController = {
  createUser,
};
