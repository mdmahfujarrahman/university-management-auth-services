"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const common_1 = require("../../../constants/common");
const faculty_constant_1 = require("../faculty/faculty.constant");
const createStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        student: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required',
                }),
                middleName: zod_1.z.string().optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required',
                }),
            }),
            gender: zod_1.z.enum([...common_1.gender], {
                required_error: 'Gender is required',
            }),
            contactNo: zod_1.z.string({
                required_error: 'Contact number is required',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email is required',
            })
                .email({
                message: 'Invalid email',
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            bloodGroup: zod_1.z.enum([...common_1.bloodGroup]).optional(),
            presentAddress: zod_1.z.string({
                required_error: 'Present address is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency contact number is required',
            }),
            guardian: zod_1.z.object({
                fatherName: zod_1.z.string({
                    required_error: 'Father name is required',
                }),
                fatherOccupation: zod_1.z.string({
                    required_error: 'Father occupation is required',
                }),
                fatherContactNo: zod_1.z.string({
                    required_error: 'Father contact number is required',
                }),
                motherName: zod_1.z.string({
                    required_error: 'Mother name is required',
                }),
                motherOccupation: zod_1.z.string({
                    required_error: 'Mother occupation is required',
                }),
                motherContactNo: zod_1.z.string({
                    required_error: 'Mother contact number is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Address is required',
                }),
            }),
            localGuardian: zod_1.z.object({
                name: zod_1.z.string({
                    required_error: 'Local guardian name is required',
                }),
                occupation: zod_1.z.string({
                    required_error: 'Local guardian occupation is required',
                }),
                contactNo: zod_1.z.string({
                    required_error: 'Local guardian contact number is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Local guardian address is required',
                }),
            }),
            academicSemester: zod_1.z.string({
                required_error: 'Academic semester is required',
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'Academic department is required',
            }),
            academicFaculty: zod_1.z.string({
                required_error: 'Academic faculty is required',
            }),
            profileImage: zod_1.z.string().optional(),
        }),
    }),
});
const createFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        faculty: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required',
                }),
                middleName: zod_1.z.string().optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required',
                }),
            }),
            gender: zod_1.z.enum([...common_1.gender], {
                required_error: 'Gender is required',
            }),
            contactNo: zod_1.z.string({
                required_error: 'Contact number is required',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email is required',
            })
                .email({
                message: 'Invalid email',
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            bloodGroup: zod_1.z.enum([...common_1.bloodGroup]).optional(),
            designation: zod_1.z.enum([...faculty_constant_1.designation], {
                required_error: 'Designation is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Present address is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency contact number is required',
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'Academic department is required',
            }),
            academicFaculty: zod_1.z.string({
                required_error: 'Academic faculty is required',
            }),
            profileImage: zod_1.z.string().optional(),
        }),
    }),
});
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        admin: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required',
                }),
                middleName: zod_1.z.string().optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required',
                }),
            }),
            gender: zod_1.z.enum([...common_1.gender], {
                required_error: 'Gender is required',
            }),
            contactNo: zod_1.z.string({
                required_error: 'Contact number is required',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email is required',
            })
                .email({
                message: 'Invalid email',
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            bloodGroup: zod_1.z.enum([...common_1.bloodGroup]).optional(),
            designation: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Present address is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency contact number is required',
            }),
            managementDepartment: zod_1.z.string({
                required_error: 'Management department is required',
            }),
            profileImage: zod_1.z.string().optional(),
        }),
    }),
});
exports.UserValidation = {
    createStudentZodSchema,
    createFacultyZodSchema,
    createAdminZodSchema,
};
