import { z } from 'zod';

const createManagementDepartmentsZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const updateManagementDepartmentsZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

export const ManagementDepartmentsValidation = {
  createManagementDepartmentsZodSchema,
  updateManagementDepartmentsZodSchema,
};
