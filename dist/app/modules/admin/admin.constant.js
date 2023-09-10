"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminPopulateFields = exports.adminSearchableFields = exports.adminFilterableFields = void 0;
exports.adminFilterableFields = [
    'searchTerm',
    'id',
    'bloodGroup',
    'email',
    'contactNo',
    'emergencyContactNo',
];
exports.adminSearchableFields = [
    'id',
    'email',
    'contactNo',
    'name.fisrtName',
    'name.middleName',
    'name.lastName',
];
exports.adminPopulateFields = [
    {
        path: 'managementDepartment',
    },
];
