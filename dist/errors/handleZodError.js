"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errorDetails = err.issues.map((issue) => {
        return {
            field: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue === null || issue === void 0 ? void 0 : issue.message,
        };
    });
    const statusCode = 400;
    return {
        success: false,
        statusCode,
        message: 'Zod Validation Error',
        errorDetails
    };
};
exports.default = handleZodError;
