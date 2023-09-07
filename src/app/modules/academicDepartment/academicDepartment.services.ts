import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../academicSemester/academicSemester.interface';
import { academicDepertmentSearchableFields } from './academicDepartment.constant';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

const getSingleDepartment = async (
  DepartmentId: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(DepartmentId).populate(
    'academicFaculty'
  );
  return result;
};

const getAllDepartments = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicDepertmentSearchableFields.map(field => ({
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

  const result = await AcademicDepartment.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const updatedDepartment = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  ).populate('academicFaculty');
  return updatedDepartment;
};

const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const deleteDepartment = await AcademicDepartment.findByIdAndDelete(id);
  return deleteDepartment;
};

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
