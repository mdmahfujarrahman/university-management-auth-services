// userServices

import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { UserService } from './user.services';

export const generateUserId = async () => {
  const currentId =
    (await UserService.getLastStudentUser()) || (0).toString().padStart(5, '0');
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return incrementedId;
};
export const generateStudentId = async (
  academicSemester: IAcademicSemester
) => {
  const currentId =
    (await UserService.getLastStudentUser()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`;

  console.log(incrementedId);
  return incrementedId;
};
export const generateAdminId = async () => {
  const currentId =
    (await UserService.getLastAdminUser()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `A${incrementedId}`;
  return incrementedId;
};
export const generateFacultyId = async () => {
  const currentId =
    (await UserService.getLastFacultyUser()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `F${incrementedId}`;
  return incrementedId;
};
