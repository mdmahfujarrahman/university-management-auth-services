import { Model } from 'mongoose';

export type IManagementDepartment = {
  title: string;
};

export type ManagementDepartmentsModel = Model<
  IManagementDepartment,
  Record<string, unknown>
>;
