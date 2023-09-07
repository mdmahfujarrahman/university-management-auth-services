import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicFacultyService } from './academicFaculty.services';
import httpStatus from 'http-status';
import { IAcademicFaculty } from './academicFaculty.interfaces';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFilter } from '../../../constants/pagination';
import { academicFacultyFilterableFields } from './academicFaculty.constant';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    message: 'Academic Faculty created successfully',
    success: true,
    data: result,
  });
});

const getAllFacultys = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFilter);

  const result = await AcademicFacultyService.getAllFacultys(
    filters,
    paginationOptions
  );
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Academic Faculty retrived successfully !',
    success: true,
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.getSingleFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    message: 'Academic Faculty retrived successfully !',
    success: true,
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.updateFaculty(
    id,
    academicFacultyData
  );
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    message: 'Academic Faculty updated successfully !',
    success: true,
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AcademicFacultyService.deleteFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    message: 'Academic Faculty deleted successfully !',
    success: true,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getSingleFaculty,
  getAllFacultys,
  updateFaculty,
  deleteFaculty,
};
