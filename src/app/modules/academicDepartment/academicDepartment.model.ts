import { Schema, model } from 'mongoose';
// types

import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
import {
  IAcademicDepartment,
  AcademicDepartmentModel,
} from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

academicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartment.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Department already exist'
    );
  }
  next();
});

export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>('academicDepartment', academicDepartmentSchema);
