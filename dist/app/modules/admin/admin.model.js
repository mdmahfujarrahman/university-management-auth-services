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
exports.Admin = exports.AdminSchema = void 0;
const mongoose_1 = require("mongoose");
// types
const common_1 = require("../../../constants/common");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const http_status_1 = __importDefault(require("http-status"));
exports.AdminSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: {
        type: {
            firstName: { type: String, required: true },
            middleName: { type: String },
            lastName: { type: String, required: true },
        },
        required: true,
    },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true, unique: true },
    emergencyContactNo: { type: String, required: true },
    gender: { type: String, required: true, enum: common_1.gender },
    permanentAddress: { type: String, required: true },
    presentAddress: { type: String, required: true },
    bloodGroup: { type: String, enum: common_1.bloodGroup },
    managementDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'managementDepartment',
        required: true,
    },
    designation: { type: String, required: true },
    profileImage: {
        type: String,
        // required: true
    },
}, { timestamps: true, toJSON: { virtuals: true } });
exports.AdminSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield exports.Admin.findOne({ email: this.email });
        if (isExist) {
            throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Admin already exist');
        }
        next();
    });
});
exports.Admin = (0, mongoose_1.model)('Admin', exports.AdminSchema);
