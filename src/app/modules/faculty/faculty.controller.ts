import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFilter } from '../../../constants/pagination';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IFaculty } from './faculty.interface';
import { FacultyServices } from './faculty.services';
import { facultyFilterableFields } from './faculty.constant';

const getAllFacultys = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFilter);

  const result = await FacultyServices.getAllFacultys(
    filters,
    paginationOptions
  );

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facultys fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFaculty(id);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students fetched successfully !',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...facultyData } = req.body;
  const result = await FacultyServices.updateFaculty(id, facultyData);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    message: 'Faculty updated successfully !',
    success: true,
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await FacultyServices.deleteFaculty(id);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    message: 'Faculty deleted successfully !',
    success: true,
  });
});

export const FacultyController = {
  getAllFacultys,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
