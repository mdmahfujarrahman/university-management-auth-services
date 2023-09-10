"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementDepartmentsRoutes = void 0;
const express_1 = __importDefault(require("express"));
// Controllers
// Validation
const managementDepartments_validation_1 = require("./managementDepartments.validation");
const validateRequst_1 = __importDefault(require("../../middleware/validateRequst"));
const managementDepartments_controller_1 = require("./managementDepartments.controller");
const router = express_1.default.Router();
router.post('/create-management', (0, validateRequst_1.default)(managementDepartments_validation_1.ManagementDepartmentsValidation.createManagementDepartmentsZodSchema), managementDepartments_controller_1.ManagementDepartmentController.createManagementDepartment);
router.patch('/:id', (0, validateRequst_1.default)(managementDepartments_validation_1.ManagementDepartmentsValidation.updateManagementDepartmentsZodSchema), managementDepartments_controller_1.ManagementDepartmentController.updateManagementDepartment);
router.get('/:id', managementDepartments_controller_1.ManagementDepartmentController.getSingleManagementDepartment);
router.get('/', managementDepartments_controller_1.ManagementDepartmentController.getAllManagementDepartments);
router.delete('/:id', managementDepartments_controller_1.ManagementDepartmentController.deleteManagementDepartment);
exports.ManagementDepartmentsRoutes = router;
