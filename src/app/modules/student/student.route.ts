import express from 'express';
// Controllers
import { StudentController } from './student.controller';
// Validation

//Middleware;
import validateRequst from '../../middleware/validateRequst';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudents);
router.patch(
  '/:id',
  validateRequst(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);
router.delete('/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
