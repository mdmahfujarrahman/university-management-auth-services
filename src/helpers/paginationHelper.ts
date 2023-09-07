import { IPaginationOptions } from '../app/modules/academicSemester/academicSemester.interface';
import { IPeginationReturnOptions } from '../interfaces/common';

const caculatePagination = (
  options: IPaginationOptions
): IPeginationReturnOptions => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = options;
  const skip = (Number(page) - 1) * Number(limit);

  return {
    skip,
    limit: Number(limit),
    page: Number(page),
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = {
  caculatePagination,
};
