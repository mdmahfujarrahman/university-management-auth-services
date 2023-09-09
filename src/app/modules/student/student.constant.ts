export const studentFilterableFields = [
  'searchTerm',
  'id',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
];

export const studentSearchableFields = [
  'id',
  'email',
  'contactNo',
  'name.fisrtName',
  'name.middleName',
  'name.lastName',
];

export const studentPopulateFields = [
  {
    path: 'academicSemester',
  },
  {
    path: 'academicDepartment',
  },
  {
    path: 'academicFaculty',
  },
];
