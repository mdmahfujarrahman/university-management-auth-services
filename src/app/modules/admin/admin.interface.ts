import { Model, Types } from 'mongoose';
import { IBloodGroup, IGender } from '../../../interfaces/common';
import { IManagementDepartment } from '../managementDepartments/managementDepartments.interface';

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IAdmin = {
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
  designation: string;
  managementDepartment: Types.ObjectId | IManagementDepartment;
  profileImage?: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
