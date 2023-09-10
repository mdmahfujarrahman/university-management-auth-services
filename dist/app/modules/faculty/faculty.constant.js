"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyPopulateFields = exports.facultySearchableFields = exports.facultyFilterableFields = exports.designation = void 0;
exports.designation = ['Professor', 'Lecturer'];
exports.facultyFilterableFields = [
    'searchTerm',
    'id',
    'bloodGroup',
    'email',
    'contactNo',
    'emergencyContactNo',
];
exports.facultySearchableFields = [
    'id',
    'email',
    'contactNo',
    'name.fisrtName',
    'name.middleName',
    'name.lastName',
];
exports.facultyPopulateFields = [
    {
        path: 'academicDepartment',
    },
    {
        path: 'academicFaculty',
    },
];
