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
exports.ManagementDepartmentController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constants/pagination");
const managementDepartments_constant_1 = require("./managementDepartments.constant");
const managementDepartments_services_1 = require("./managementDepartments.services");
const createManagementDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const managementDepartmentsData = __rest(req.body, []);
    const result = yield managementDepartments_services_1.ManagementDepartmentService.createManagementDepartment(managementDepartmentsData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Management Department created successfully',
        success: true,
        data: result,
    });
}));
const getAllManagementDepartments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, managementDepartments_constant_1.managementDepartmentFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFilter);
    const result = yield managementDepartments_services_1.ManagementDepartmentService.getAllManagementDepartments(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Management Department retrived successfully !',
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleManagementDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield managementDepartments_services_1.ManagementDepartmentService.getSingleManagementDepartment(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Management Department retrived successfully !',
        success: true,
        data: result,
    });
}));
const updateManagementDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const managementDepartmentData = __rest(req.body, []);
    const result = yield managementDepartments_services_1.ManagementDepartmentService.updateManagementDepartment(id, managementDepartmentData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Management Department updated successfully !',
        success: true,
        data: result,
    });
}));
const deleteManagementDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield managementDepartments_services_1.ManagementDepartmentService.deleteManagementDepartment(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Academic Faculty deleted successfully !',
        success: true,
    });
}));
exports.ManagementDepartmentController = {
    createManagementDepartment,
    getSingleManagementDepartment,
    getAllManagementDepartments,
    updateManagementDepartment,
    deleteManagementDepartment,
};
