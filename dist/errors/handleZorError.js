"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    const errors = error.issues.map((i) => {
        return {
            path: i === null || i === void 0 ? void 0 : i.path[(i === null || i === void 0 ? void 0 : i.path.length) - 1],
            message: i === null || i === void 0 ? void 0 : i.message,
        };
    });
    const statusCode = 400;
    return { statusCode, message: 'Validation Error', errorMessages: errors };
};
exports.default = handleZodError;
