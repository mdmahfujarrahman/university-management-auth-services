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
exports.AdminServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const http_status_1 = __importDefault(require("http-status"));
const admin_constant_1 = require("./admin.constant");
const admin_model_1 = require("./admin.model");
const getAllAdmins = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: admin_constant_1.adminSearchableFields.map(field => ({
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
    const result = yield admin_model_1.Admin.find(whereCondition)
        .populate(admin_constant_1.adminPopulateFields)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield admin_model_1.Admin.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findById(id).populate(admin_constant_1.adminPopulateFields);
    return result;
});
const updateAdmin = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExit = yield admin_model_1.Admin.findOne({ id: id });
    if (!isExit) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Admin not found');
    }
    const { name } = payload, adminData = __rest(payload, ["name"]);
    const updatedAdminData = Object.assign({}, adminData);
    if (name && Object.keys(name).length) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updatedAdminData[nameKey] = name[key];
        });
    }
    const updatedAdmin = yield admin_model_1.Admin.findOneAndUpdate({ id: id }, updatedAdminData, {
        new: true,
    }).populate(admin_constant_1.adminPopulateFields);
    return updatedAdmin;
});
const deleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findByIdAndDelete(id).populate(admin_constant_1.adminPopulateFields);
    return result;
});
exports.AdminServices = {
    getAllAdmins,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin,
};
