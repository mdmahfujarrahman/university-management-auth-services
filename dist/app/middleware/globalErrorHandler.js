"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const ApiErrors_1 = __importDefault(require("../../errors/ApiErrors"));
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const logger_1 = require("../../shared/logger");
const zod_1 = require("zod");
const handleZorError_1 = __importDefault(require("../../errors/handleZorError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const globalErrorHandler = (error, req, res, next) => {
    config_1.default.env === 'development'
        ? console.log(`🐱‍🏍 globalErrorHandler ~~`, error)
        : logger_1.errorLogger.error(`🐱‍🏍 globalErrorHandler ~~`, error);
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorMessages = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error.name === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZorError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof ApiErrors_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [{ path: '', message: error === null || error === void 0 ? void 0 : error.message }]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        sucess: false,
        message,
        errorMessages,
        stcak: config_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
