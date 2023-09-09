// Config
import config from '../../../config';
// Models
import { User } from './user.model';
// Interfaces
import { IUser } from './user.interface';
// Utils
import ApiError from '../../../errors/ApiErrors';
import { ENUM_USER_ROLES } from '../../../enums/users';
import { generateFacultyId, generateStudentId } from './user.utils';
import { IStudent } from '../student/student.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { studentPopulateFields } from '../student/student.constant';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { facultyPopulateFields } from '../faculty/faculty.constant';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  // set role
  user.role = ENUM_USER_ROLES.STUDENT;
  // get academic semester
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );
  let newUserData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;
    // create student
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  // if (newUserData) {
  //   newUserData = await User.findOne({ id: newUserData.id }).populate({
  //     path: 'student',
  //     populate: [
  //       {
  //         path: 'academicSemester',
  //         model: 'AcademicSemester',
  //       },
  //       {
  //         path: 'academicDepartment',
  //         model: 'AcademicDepartment',
  //       },
  //       {
  //         path: 'academicFaculty',
  //         model: 'AcademicFaculty',
  //       },
  //     ],
  //   });
  // }
  if (newUserData) {
    newUserData = await User.findOne({ id: newUserData.id }).populate({
      path: 'student',
      populate: studentPopulateFields,
    });
  }

  return newUserData;
};
const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  // set role
  user.role = ENUM_USER_ROLES.FACULTY;
  // get academic semester
  let newFacultyData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;
    // create Faculty
    const newFaculty = await Faculty.create([faculty], { session });
    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    user.faculty = newFaculty[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newFacultyData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newFacultyData) {
    newFacultyData = await User.findOne({ id: newFacultyData.id }).populate({
      path: 'faculty',
      populate: facultyPopulateFields,
    });
  }

  return newFacultyData;
};

const getLastStudentUser = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    { role: ENUM_USER_ROLES.STUDENT },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined;
};
const getLastAdminUser = async (): Promise<string | undefined> => {
  const adminUser = await User.findOne(
    { role: ENUM_USER_ROLES.ADMIN },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return adminUser?.id ? adminUser?.id.substring(2) : undefined;
};
const getLastFacultyUser = async (): Promise<string | undefined> => {
  const facultyUser = await User.findOne(
    { role: ENUM_USER_ROLES.FACULTY },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return facultyUser?.id ? facultyUser?.id.substring(2) : undefined;
};

export const UserService = {
  createStudent,
  createFaculty,
  getLastStudentUser,
  getLastAdminUser,
  getLastFacultyUser,
};
