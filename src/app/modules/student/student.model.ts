import { Schema, model } from 'mongoose';
// types
import { IStudent, StudentModel } from './student.interface';
import { bloodGroup, gender } from '../../../constants/common';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';

export const StudentSchema = new Schema<IStudent, StudentModel>(
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
    contactNo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: String, required: true },
    bloodGroup: { type: String, enum: bloodGroup },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: {
        fatherName: { type: String, required: true },
        fatherOccupation: { type: String, required: true },
        fatherContactNo: { type: String, required: true },
        motherName: { type: String, required: true },
        motherOccupation: { type: String, required: true },
        motherContactNo: { type: String, required: true },
        address: { type: String, required: true },
      },
      required: true,
    },
    localGuardian: {
      type: {
        name: { type: String, required: true },
        occupation: { type: String, required: true },
        contactNo: { type: String, required: true },
        address: { type: String, required: true },
      },
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'academicSemester',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'academicDepartment',
      required: true,
    },
    profileImage: {
      type: String,
      // required: true
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

StudentSchema.pre('save', async function (next) {
  const isExist = await Student.findOne({ email: this.email });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Faculty already exist');
  }
  next();
});

export const Student = model<IStudent, StudentModel>('Student', StudentSchema);
