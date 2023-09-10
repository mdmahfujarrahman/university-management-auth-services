import { Schema, model } from 'mongoose';
// types
import { bloodGroup, gender } from '../../../constants/common';
import { AdminModel, IAdmin } from './admin.interface';

import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';

export const AdminSchema = new Schema<IAdmin, AdminModel>(
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
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true, unique: true },
    emergencyContactNo: { type: String, required: true },
    gender: { type: String, required: true, enum: gender },
    permanentAddress: { type: String, required: true },
    presentAddress: { type: String, required: true },
    bloodGroup: { type: String, enum: bloodGroup },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'managementDepartment',
      required: true,
    },
    designation: { type: String, required: true },
    profileImage: {
      type: String,
      // required: true
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

AdminSchema.pre('save', async function (next) {
  const isExist = await Admin.findOne({ email: this.email });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Admin already exist');
  }
  next();
});

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
