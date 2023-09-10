import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFilter } from '../../../constants/pagination';
import { IManagementDepartment } from './managementDepartments.interface';
import { managementDepartmentFilterableFields } from './managementDepartments.constant';
import { ManagementDepartmentService } from './managementDepartments.services';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...managementDepartmentsData } = req.body;
    const result = await ManagementDepartmentService.createManagementDepartment(
      managementDepartmentsData
    );
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      message: 'Management Department created successfully',
      success: true,
      data: result,
    });
  }
);

const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFilter);

    const result =
      await ManagementDepartmentService.getAllManagementDepartments(
        filters,
        paginationOptions
      );
    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      message: 'Management Department retrived successfully !',
      success: true,
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      message: 'Management Department retrived successfully !',
      success: true,
      data: result,
    });
  }
);

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...managementDepartmentData } = req.body;
    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      managementDepartmentData
    );
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      message: 'Management Department updated successfully !',
      success: true,
      data: result,
    });
  }
);

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await ManagementDepartmentService.deleteManagementDepartment(id);
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      message: 'Academic Faculty deleted successfully !',
      success: true,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getSingleManagementDepartment,
  getAllManagementDepartments,
  updateManagementDepartment,
  deleteManagementDepartment,
};
