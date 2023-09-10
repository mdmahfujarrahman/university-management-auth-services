"use strict";
// userServices
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFacultyId = exports.generateAdminId = exports.generateStudentId = exports.generateUserId = void 0;
const users_1 = require("../../../enums/users");
const user_services_1 = require("./user.services");
const generateUserId = (role) => __awaiter(void 0, void 0, void 0, function* () {
    let id;
    if (role === users_1.ENUM_USER_ROLES.STUDENT) {
        const test = {
            code: '01',
            year: '2025',
            title: 'Fall',
            startMonth: 'October',
            endMonth: 'November',
        };
        id = yield (0, exports.generateStudentId)(test);
    }
    else if (role === users_1.ENUM_USER_ROLES.ADMIN) {
        id = yield (0, exports.generateAdminId)();
    }
    else if (role === users_1.ENUM_USER_ROLES.FACULTY) {
        id = yield (0, exports.generateFacultyId)();
    }
    return id;
});
exports.generateUserId = generateUserId;
const generateStudentId = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield user_services_1.UserService.getLastStudentUser()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.year.substring(2)}${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.code}${incrementedId}`;
    return incrementedId;
});
exports.generateStudentId = generateStudentId;
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield user_services_1.UserService.getLastAdminUser()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `A-${incrementedId}`;
    return incrementedId;
});
exports.generateAdminId = generateAdminId;
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield user_services_1.UserService.getLastFacultyUser()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `F-${incrementedId}`;
    return incrementedId;
});
exports.generateFacultyId = generateFacultyId;
