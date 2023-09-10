"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentPopulateFields = exports.studentSearchableFields = exports.studentFilterableFields = void 0;
exports.studentFilterableFields = [
    'searchTerm',
    'id',
    'bloodGroup',
    'email',
    'contactNo',
    'emergencyContactNo',
];
exports.studentSearchableFields = [
    'id',
    'email',
    'contactNo',
    'name.fisrtName',
    'name.middleName',
    'name.lastName',
];
exports.studentPopulateFields = [
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
