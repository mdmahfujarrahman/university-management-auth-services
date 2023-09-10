import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFilter } from '../../../constants/pagination';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IAdmin } from './admin.interface';
import { adminFilterableFields } from './admin.constant';
import { AdminServices } from './admin.services';

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFilter);

  const result = await AdminServices.getAllAdmins(filters, paginationOptions);

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdmin(id);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin fetched successfully !',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...adminData } = req.body;
  const result = await AdminServices.updateAdmin(id, adminData);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    message: 'Admin updated successfully !',
    success: true,
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AdminServices.deleteAdmin(id);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    message: 'Admin deleted successfully !',
    success: true,
  });
});

export const AdminController = {
  getSingleAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
};
