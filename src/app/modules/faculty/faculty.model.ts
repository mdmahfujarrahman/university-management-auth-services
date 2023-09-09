import { Schema, model } from 'mongoose';
// types
import { FacultyModel, IFaculty } from './faculty.interface';
import { bloodGroup, gender } from '../../../constants/common';

import { designation } from './faculty.constant';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';

export const FacultySchema = new Schema<IFaculty, FacultyModel>(
  {
    id: { type: String, required: true, unique: true },
    name: {
      type: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
      },
      required: true,
    },
    gender: { type: String, required: true, enum: gender },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true, unique: true },
    bloodGroup: { type: String, enum: bloodGroup },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    designation: { type: String, required: true, enum: designation },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'academicDepartment',
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
      required: true,
    },
    profileImage: {
      type: String,
      // required: true
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

FacultySchema.pre('save', async function (next) {
  const isExist = await Faculty.findOne({ email: this.email });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Faculty already exist');
  }
  next();
});

export const Faculty = model<IFaculty, FacultyModel>('Faculty', FacultySchema);
