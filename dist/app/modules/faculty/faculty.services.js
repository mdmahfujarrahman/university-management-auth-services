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
exports.FacultyServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const http_status_1 = __importDefault(require("http-status"));
const faculty_model_1 = require("./faculty.model");
const faculty_constant_1 = require("./faculty.constant");
const getAllFacultys = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: faculty_constant_1.facultySearchableFields.map(field => ({
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
    const result = yield faculty_model_1.Faculty.find(whereCondition)
        .populate(faculty_constant_1.facultyPopulateFields)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield faculty_model_1.Faculty.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findById(id).populate(faculty_constant_1.facultyPopulateFields);
    return result;
});
const updateFaculty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExit = yield faculty_model_1.Faculty.findOne({ id: id });
    if (!isExit) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Faculty not found');
    }
    const { name } = payload, facultyData = __rest(payload, ["name"]);
    const updatedFacultyData = Object.assign({}, facultyData);
    if (name && Object.keys(name).length) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updatedFacultyData[nameKey] = name[key];
        });
    }
    const updatedFaculty = yield faculty_model_1.Faculty.findOneAndUpdate({ id: id }, updatedFacultyData, {
        new: true,
    }).populate(faculty_constant_1.facultyPopulateFields);
    return updatedFaculty;
});
const deleteFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findByIdAndDelete(id).populate(faculty_constant_1.facultyPopulateFields);
    return result;
});
exports.FacultyServices = {
    getAllFacultys,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,
};
