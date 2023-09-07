import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.services';
import { Request, Response } from 'express';
import { IAcademicDepartment } from './academicDepartment.interface';
import pick from '../../../shared/pick';
import { academicDepertmentSearchableFields } from './academicDepartment.constant';
import { paginationFilter } from '../../../constants/pagination';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body;
  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData
  );
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    message: 'Academic Department created successfully',
    success: true,
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepertmentSearchableFields);
  const paginationOptions = pick(req.query, paginationFilter);

  const result = await AcademicDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  );
  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Academic Department retrived successfully !',
    success: true,
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.getSingleDepartment(id);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    message: 'Academic Department retrived successfully !',
    success: true,
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...academicDepartmentData } = req.body;
  const result = await AcademicDepartmentService.updateDepartment(
    id,
    academicDepartmentData
  );
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    message: 'Academic Department updated successfully !',
    success: true,
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AcademicDepartmentService.deleteDepartment(id);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    message: 'Academic Department deleted successfully !',
    success: true,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
