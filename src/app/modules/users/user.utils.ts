// userServices

import { ENUM_USER_ROLES } from '../../../enums/users';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { UserService } from './user.services';

export const generateUserId = async (
  role: string
): Promise<string | undefined> => {
  let id;
  if (role === ENUM_USER_ROLES.STUDENT) {
    const test: IAcademicSemester = {
      code: '01',
      year: '2025',
      title: 'Fall',
      startMonth: 'October',
      endMonth: 'November',
    };
    id = await generateStudentId(test);
  } else if (role === ENUM_USER_ROLES.ADMIN) {
    id = await generateAdminId();
  } else if (role === ENUM_USER_ROLES.FACULTY) {
    id = await generateFacultyId();
  }

  return id;
};
export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await UserService.getLastStudentUser()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`;

  return incrementedId;
};
export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await UserService.getLastAdminUser()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};
export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await UserService.getLastFacultyUser()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};
