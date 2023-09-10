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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const student_model_1 = require("./student.model");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const student_constant_1 = require("./student.constant");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const http_status_1 = __importDefault(require("http-status"));
const getAllStudents = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: student_constant_1.studentSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([key, value]) => ({
                [key]: value,
            })),
        });
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.caculatePagination(paginationOptions);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const result = yield student_model_1.Student.find(whereCondition)
        .populate(student_constant_1.studentPopulateFields)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield student_model_1.Student.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findById(id).populate(student_constant_1.studentPopulateFields);
    return result;
});
const updateStudent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExit = yield student_model_1.Student.findOne({ id: id });
    if (!isExit) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Student not found');
    }
    const { name, guardian, localGuardian } = payload, studentData = __rest(payload, ["name", "guardian", "localGuardian"]);
    const updatedStudendData = Object.assign({}, studentData);
    if (name && Object.keys(name).length) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updatedStudendData[nameKey] = name[key];
        });
    }
    if (guardian && Object.keys(guardian).length) {
        Object.keys(guardian).forEach(key => {
            const guardianKey = `guardian.${key}`;
            updatedStudendData[guardianKey] =
                guardian[key];
        });
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        Object.keys(localGuardian).forEach(key => {
            const localGuardianKey = `localGuardian.${key}`;
            updatedStudendData[localGuardianKey] =
                localGuardian[key];
        });
    }
    const updatedSemester = yield student_model_1.Student.findOneAndUpdate({ id: id }, updatedStudendData, {
        new: true,
    }).populate(student_constant_1.studentPopulateFields);
    return updatedSemester;
});
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findByIdAndDelete(id).populate(student_constant_1.studentPopulateFields);
    return result;
});
exports.StudentServices = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
};
