"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
// Controllers
// Validation
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const validateRequst_1 = __importDefault(require("../../middleware/validateRequst"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequst_1.default)(academicFaculty_validation_1.AcademicFacultyValidation.createFacultyZodSchema), academicFaculty_controller_1.AcademicFacultyController.createFaculty);
router.patch('/:id', (0, validateRequst_1.default)(academicFaculty_validation_1.AcademicFacultyValidation.updateFacultyZodSchema), academicFaculty_controller_1.AcademicFacultyController.updateFaculty);
router.get('/:id', academicFaculty_controller_1.AcademicFacultyController.getSingleFaculty);
router.get('/', academicFaculty_controller_1.AcademicFacultyController.getAllFacultys);
router.delete('/:id', academicFaculty_controller_1.AcademicFacultyController.deleteFaculty);
exports.AcademicFacultyRoutes = router;
