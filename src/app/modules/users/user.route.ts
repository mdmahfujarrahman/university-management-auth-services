import express from 'express';
// Controllers
import { UserController } from './user.controller';
// Validation
import { UserValidation } from './user.validation';
import validateRequst from '../../middleware/validateRequst';

const router = express.Router();

router.post(
  '/create-user',
  validateRequst(UserValidation.createUserZodSchema),
  UserController.createUser
);

export const UserRoutes = router;
