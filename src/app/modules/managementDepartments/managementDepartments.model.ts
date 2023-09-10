import { Schema, model } from 'mongoose';
// types

import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
import {
  IManagementDepartment,
  ManagementDepartmentsModel,
} from './managementDepartments.interface';

const managementDepartmentSchema = new Schema<IManagementDepartment>(
  {
    title: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

managementDepartmentSchema.pre('save', async function (next) {
  const isExist = await ManagementDepartment.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Management Departments already exist'
    );
  }
  next();
});

export const ManagementDepartment = model<
  IManagementDepartment,
  ManagementDepartmentsModel
>('managementDepartment', managementDepartmentSchema);
