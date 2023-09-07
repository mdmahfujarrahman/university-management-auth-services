import { Schema, model } from 'mongoose';
// types

import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interfaces';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

academicFacultySchema.pre('save', async function (next) {
  const isExist = await AcademicFaculty.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Academic faculty already exist');
  }
  next();
});

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'academicFaculty',
  academicFacultySchema
);
