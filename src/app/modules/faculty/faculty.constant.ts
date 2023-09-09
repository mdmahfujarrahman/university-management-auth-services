import { IDesignation } from './faculty.interface';

export const designation: IDesignation[] = ['Professor', 'Lecturer'];

export const facultyFilterableFields = [
  'searchTerm',
  'id',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
];

export const facultySearchableFields = [
  'id',
  'email',
  'contactNo',
  'name.fisrtName',
  'name.middleName',
  'name.lastName',
];
export const facultyPopulateFields = [
  {
    path: 'academicDepartment',
  },
  {
    path: 'academicFaculty',
  },
];
