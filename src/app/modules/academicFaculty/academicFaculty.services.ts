import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IFilters, IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../academicSemester/academicSemester.interface';
import { IAcademicFaculty } from './academicFaculty.interfaces';
import { AcademicFaculty } from './academicFaculty.model';
import { academicFacultySearchableFields } from './academicFaculty.constant';

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getSingleFaculty = async (
  FacultyId: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(FacultyId);
  return result;
};

const getAllFacultys = async (
  filters: IFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicFacultySearchableFields.map(field => ({
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

  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const updatedFaculty = await AcademicFaculty.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return updatedFaculty;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const deleteFaculty = await AcademicFaculty.findByIdAndDelete(id);
  return deleteFaculty;
};

export const AcademicFacultyService = {
  createFaculty,
  getSingleFaculty,
  getAllFacultys,
  updateFaculty,
  deleteFaculty,
};
