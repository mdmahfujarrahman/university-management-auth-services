// Types
import { Request, Response } from 'express';
// Services
import { UserService } from './user.services';
// High Order Functions
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await UserService.createStudent(student, userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Student created successfully',
    success: true,
    data: result,
  });
});

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body;
  const result = await UserService.createFaculty(faculty, userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Faculty created successfully',
    success: true,
    data: result,
  });
});
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userData } = req.body;
  const result = await UserService.createAdmin(admin, userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Admin created successfully',
    success: true,
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
