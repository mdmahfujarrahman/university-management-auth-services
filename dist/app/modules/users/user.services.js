"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
// Config
const config_1 = __importDefault(require("../../../config"));
// Models
const user_model_1 = require("./user.model");
// Utils
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const users_1 = require("../../../enums/users");
const user_utils_1 = require("./user.utils");
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("../student/student.model");
const http_status_1 = __importDefault(require("http-status"));
const student_constant_1 = require("../student/student.constant");
const faculty_model_1 = require("../faculty/faculty.model");
const faculty_constant_1 = require("../faculty/faculty.constant");
const admin_model_1 = require("../admin/admin.model");
const admin_constant_1 = require("../admin/admin.constant");
const createStudent = (student, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
        user.password = config_1.default.default_student_password;
    }
    // set role
    user.role = users_1.ENUM_USER_ROLES.STUDENT;
    // get academic semester
    const academicSemester = yield academicSemester_model_1.AcademicSemester.findById(student.academicSemester);
    let newUserData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const id = yield (0, user_utils_1.generateStudentId)(academicSemester);
        user.id = id;
        student.id = id;
        // create student
        const newStudent = yield student_model_1.Student.create([student], { session });
        if (!newStudent.length) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create student');
        }
        user.student = newStudent[0]._id;
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newUserData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserData) {
        newUserData = yield user_model_1.User.findOne({ id: newUserData.id }).populate({
            path: 'student',
            populate: student_constant_1.studentPopulateFields,
        });
    }
    return newUserData;
});
const createFaculty = (faculty, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
        user.password = config_1.default.default_student_password;
    }
    // set role
    user.role = users_1.ENUM_USER_ROLES.FACULTY;
    // get academic semester
    let newFacultyData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const id = yield (0, user_utils_1.generateFacultyId)();
        user.id = id;
        faculty.id = id;
        // create Faculty
        const newFaculty = yield faculty_model_1.Faculty.create([faculty], { session });
        if (!newFaculty.length) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create faculty');
        }
        user.faculty = newFaculty[0]._id;
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newFacultyData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newFacultyData) {
        newFacultyData = yield user_model_1.User.findOne({ id: newFacultyData.id }).populate({
            path: 'faculty',
            populate: faculty_constant_1.facultyPopulateFields,
        });
    }
    return newFacultyData;
});
const createAdmin = (admin, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
        user.password = config_1.default.default_student_password;
    }
    // set role
    user.role = users_1.ENUM_USER_ROLES.ADMIN;
    // get academic semester
    let newAdminData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const id = yield (0, user_utils_1.generateAdminId)();
        user.id = id;
        admin.id = id;
        // create Admin
        const newAdmin = yield admin_model_1.Admin.create([admin], { session });
        if (!newAdmin.length) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Admin');
        }
        user.admin = newAdmin[0]._id;
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newAdminData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newAdminData) {
        newAdminData = yield user_model_1.User.findOne({ id: newAdminData.id }).populate({
            path: 'admin',
            populate: admin_constant_1.adminPopulateFields,
        });
    }
    return newAdminData;
});
const getLastStudentUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne({ role: users_1.ENUM_USER_ROLES.STUDENT }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id.substring(4) : undefined;
});
const getLastAdminUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const adminUser = yield user_model_1.User.findOne({ role: users_1.ENUM_USER_ROLES.ADMIN }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (adminUser === null || adminUser === void 0 ? void 0 : adminUser.id) ? adminUser === null || adminUser === void 0 ? void 0 : adminUser.id.substring(2) : undefined;
});
const getLastFacultyUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const facultyUser = yield user_model_1.User.findOne({ role: users_1.ENUM_USER_ROLES.FACULTY }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (facultyUser === null || facultyUser === void 0 ? void 0 : facultyUser.id) ? facultyUser === null || facultyUser === void 0 ? void 0 : facultyUser.id.substring(2) : undefined;
});
exports.UserService = {
    createStudent,
    createFaculty,
    createAdmin,
    getLastStudentUser,
    getLastAdminUser,
    getLastFacultyUser,
};
