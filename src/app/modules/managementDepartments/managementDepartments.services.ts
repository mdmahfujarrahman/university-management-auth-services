import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IFilters, IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../academicSemester/academicSemester.interface';
import { IManagementDepartment } from './managementDepartments.interface';
import { ManagementDepartment } from './managementDepartments.model';
import { managementDepartmentSearchableFields } from './managementDepartments.constant';

const createManagementDepartment = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

const getSingleManagementDepartment = async (
  managementDepartmentId: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(managementDepartmentId);
  return result;
};

const getAllManagementDepartments = async (
  filters: IFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: managementDepartmentSearchableFields.map(field => ({
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

  const result = await ManagementDepartment.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await ManagementDepartment.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateManagementDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  const updatedFaculty = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return updatedFaculty;
};

const deleteManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const deleteFaculty = await ManagementDepartment.findByIdAndDelete(id);
  return deleteFaculty;
};

export const ManagementDepartmentService = {
  createManagementDepartment,
  getSingleManagementDepartment,
  getAllManagementDepartments,
  updateManagementDepartment,
  deleteManagementDepartment,
};
