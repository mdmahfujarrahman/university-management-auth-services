import express from 'express';
// Controllers
import { AcademicSemesterController } from './academicSemester.controller';
// Validation
import { AcademicSemesterValidation } from './academicSemester.validation';
import validateRequst from '../../middleware/validateRequst';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequst(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);
router.patch(
  '/:id',
  validateRequst(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);
router.get('/:id', AcademicSemesterController.getSingleSemester);
router.get('/', AcademicSemesterController.getAllSemesters);
router.delete('/:id', AcademicSemesterController.deleteSemester);

export const AcademicSemesterRoutes = router;
