import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { StudentServices } from './student.services';
import pick from '../../../shared/pick';
import { studentFilterableFields } from './student.constant';
import { paginationFilter } from '../../../constants/pagination';
import { IStudent } from './student.interface';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFilter);

  const result = await StudentServices.getAllStudents(
    filters,
    paginationOptions
  );

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students fetched successfully !',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...studentData } = req.body;
  const result = await StudentServices.updateStudent(id, studentData);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    message: 'Student updated successfully !',
    success: true,
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await StudentServices.deleteStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    message: 'Student deleted successfully !',
    success: true,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
