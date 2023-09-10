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
exports.Student = exports.StudentSchema = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("../../../constants/common");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const http_status_1 = __importDefault(require("http-status"));
exports.StudentSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: {
        type: {
            firstName: { type: String, required: true },
            middleName: { type: String },
            lastName: { type: String, required: true },
        },
        required: true,
    },
    gender: { type: String, required: true, enum: common_1.gender },
    contactNo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: String, required: true },
    bloodGroup: { type: String, enum: common_1.bloodGroup },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
        type: {
            fatherName: { type: String, required: true },
            fatherOccupation: { type: String, required: true },
            fatherContactNo: { type: String, required: true },
            motherName: { type: String, required: true },
            motherOccupation: { type: String, required: true },
            motherContactNo: { type: String, required: true },
            address: { type: String, required: true },
        },
        required: true,
    },
    localGuardian: {
        type: {
            name: { type: String, required: true },
            occupation: { type: String, required: true },
            contactNo: { type: String, required: true },
            address: { type: String, required: true },
        },
        required: true,
    },
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'academicSemester',
        required: true,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'academicDepartment',
        required: true,
    },
    profileImage: {
        type: String,
        // required: true
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'academicFaculty',
        required: true,
    },
}, { timestamps: true, toJSON: { virtuals: true } });
exports.StudentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield exports.Student.findOne({ email: this.email });
        if (isExist) {
            throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Faculty already exist');
        }
        next();
    });
});
exports.Student = (0, mongoose_1.model)('Student', exports.StudentSchema);
