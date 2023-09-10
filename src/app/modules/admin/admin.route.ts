import express from 'express';
// Controllers
import { AdminController } from './admin.controller';
// Validation

//Middleware;
import validateRequst from '../../middleware/validateRequst';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.get('/:id', AdminController.getSingleAdmin);
router.get('/', AdminController.getAllAdmins);
router.patch(
  '/:id',
  validateRequst(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin
);
router.delete('/:id', AdminController.deleteAdmin);

export const AdminRoutes = router;
