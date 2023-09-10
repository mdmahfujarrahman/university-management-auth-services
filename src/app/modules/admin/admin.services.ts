/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../academicSemester/academicSemester.interface';
import { IGenericResponse } from '../../../interfaces/common';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
import { IAdmin, IAdminFilters } from './admin.interface';
import { adminPopulateFields, adminSearchableFields } from './admin.constant';
import { Admin } from './admin.model';

const getAllAdmins = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: adminSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.caculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await Admin.find(whereCondition)
    .populate(adminPopulateFields)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Admin.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id).populate(adminPopulateFields);
  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExit = await Admin.findOne({ id: id });
  if (!isExit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  const { name, ...adminData } = payload;
  const updatedAdminData: Partial<IAdmin> = { ...adminData };

  if (name && Object.keys(name).length) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const updatedAdmin = await Admin.findOneAndUpdate(
    { id: id },
    updatedAdminData,
    {
      new: true,
    }
  ).populate(adminPopulateFields);
  return updatedAdmin;
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findByIdAndDelete(id).populate(
    adminPopulateFields
  );
  return result;
};
export const AdminServices = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
