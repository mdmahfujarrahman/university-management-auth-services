"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
// Controllers
const academicSemester_controller_1 = require("./academicSemester.controller");
// Validation
const academicSemester_validation_1 = require("./academicSemester.validation");
const validateRequst_1 = __importDefault(require("../../middleware/validateRequst"));
const router = express_1.default.Router();
router.post('/create-semester', (0, validateRequst_1.default)(academicSemester_validation_1.AcademicSemesterValidation.createAcademicSemesterZodSchema), academicSemester_controller_1.AcademicSemesterController.createSemester);
router.patch('/:id', (0, validateRequst_1.default)(academicSemester_validation_1.AcademicSemesterValidation.updateAcademicSemesterZodSchema), academicSemester_controller_1.AcademicSemesterController.updateSemester);
router.get('/:id', academicSemester_controller_1.AcademicSemesterController.getSingleSemester);
router.get('/', academicSemester_controller_1.AcademicSemesterController.getAllSemesters);
router.delete('/:id', academicSemester_controller_1.AcademicSemesterController.deleteSemester);
exports.AcademicSemesterRoutes = router;