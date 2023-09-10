import express from 'express';
// Controllers
// Validation
import { ManagementDepartmentsValidation } from './managementDepartments.validation';
import validateRequst from '../../middleware/validateRequst';
import { ManagementDepartmentController } from './managementDepartments.controller';

const router = express.Router();

router.post(
  '/create-management',
  validateRequst(
    ManagementDepartmentsValidation.createManagementDepartmentsZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);
router.patch(
  '/:id',
  validateRequst(
    ManagementDepartmentsValidation.updateManagementDepartmentsZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
);
router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment
);
router.get('/', ManagementDepartmentController.getAllManagementDepartments);
router.delete(
  '/:id',
  ManagementDepartmentController.deleteManagementDepartment
);

export const ManagementDepartmentsRoutes = router;
