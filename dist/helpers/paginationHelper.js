"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const caculatePagination = (options) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', } = options;
    const skip = (Number(page) - 1) * Number(limit);
    return {
        skip,
        limit: Number(limit),
        page: Number(page),
        sortBy,
        sortOrder,
    };
};
exports.paginationHelper = {
    caculatePagination,
};
