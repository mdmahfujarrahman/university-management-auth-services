import express from 'express';
// Controllers
import { UserController } from './user.controller';
// Validation
import { UserValidation } from './user.validation';
import validateRequst from '../../middleware/validateRequst';

const router = express.Router();

router.post(
  '/create-student',
  validateRequst(UserValidation.createStudentZodSchema),
  UserController.createStudent
);
router.post(
  '/create-faculty',
  validateRequst(UserValidation.createFacultyZodSchema),
  UserController.createFaculty
);

export const UserRoutes = router;
