// Types
import { Request, Response, NextFunction } from 'express';
// Services
import { AcademicSemesterService } from './academicSemester.services';
// High Order Functions
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Academic Semester created successfully',
      success: true,
      data: result,
    });
    next();
  }
);

export const AcademicSemesterController = {
  createSemester,
};
