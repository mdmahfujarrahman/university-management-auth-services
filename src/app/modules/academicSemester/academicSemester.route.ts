import express from 'express';
// Controllers
import { AcademicSemesterController } from './academicSemester.controller';
// Validation
import { AcademicSemesterValidation } from './academicSemester.validation';
import validateRequst from '../../middleware/validateRequst';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequst(AcademicSemesterValidation.academicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

export const AcademicSemesterRoutes = router;
