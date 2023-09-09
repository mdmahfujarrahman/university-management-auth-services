import { Model, Types } from 'mongoose';
import { IBloodGroup, IGender } from '../../../interfaces/common';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces';

export type IDesignation = 'Professor' | 'Lecturer';

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IFaculty = {
  id: string;
  name: UserName;
  gender: IGender;
  contactNo: string;
  email: string;
  dateOfBirth: string;
  bloodGroup?: IBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  emergencyContactNo: string;
  designation: IDesignation;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  profileImage?: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
