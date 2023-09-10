"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const common_1 = require("../../../constants/common");
const updateAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
        })
            .optional(),
        gender: zod_1.z.enum([...common_1.gender]).optional(),
        dateOfBirth: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        contactNo: zod_1.z.string().optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.enum([...common_1.bloodGroup]).optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        designation: zod_1.z.string().optional(),
        managementDepartment: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
    }),
});
exports.AdminValidation = {
    updateAdminZodSchema,
};
