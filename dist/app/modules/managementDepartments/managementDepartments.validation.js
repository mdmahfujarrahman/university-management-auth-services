"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementDepartmentsValidation = void 0;
const zod_1 = require("zod");
const createManagementDepartmentsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
    }),
});
const updateManagementDepartmentsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
    }),
});
exports.ManagementDepartmentsValidation = {
    createManagementDepartmentsZodSchema,
    updateManagementDepartmentsZodSchema,
};
