import express from 'express';
// Controllers
// Validation
import { AcademicFacultyValidation } from './academicFaculty.validation';
import validateRequst from '../../middleware/validateRequst';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/',
  validateRequst(AcademicFacultyValidation.createFacultyZodSchema),
  AcademicFacultyController.createFaculty
);
router.patch(
  '/:id',
  validateRequst(AcademicFacultyValidation.updateFacultyZodSchema),
  AcademicFacultyController.updateFaculty
);
router.get('/:id', AcademicFacultyController.getSingleFaculty);
router.get('/', AcademicFacultyController.getAllFacultys);
router.delete('/:id', AcademicFacultyController.deleteFaculty);

export const AcademicFacultyRoutes = router;
