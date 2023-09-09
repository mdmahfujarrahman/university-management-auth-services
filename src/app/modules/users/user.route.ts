import express from 'express';
// Controllers
import { UserController } from './user.controller';
// Validation
import { UserValidation } from './user.validation';
import validateRequst from '../../middleware/validateRequst';

const router = express.Router();

router.post(
  '/create-student',
  validateRequst(UserValidation.createUserZodSchema),
  UserController.createStudent
);

export const UserRoutes = router;
