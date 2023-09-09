import express from 'express';
// Controllers
import { FacultyController } from './faculty.controller';
// Validation

//Middleware;
import validateRequst from '../../middleware/validateRequst';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/:id', FacultyController.getSingleFaculty);
router.get('/', FacultyController.getAllFacultys);
router.patch(
  '/:id',
  validateRequst(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoutes = router;
