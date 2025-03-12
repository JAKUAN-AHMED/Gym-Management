"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const errorDetails = Object.values(err.errors).map((val) => {
        return {
            field: val === null || val === void 0 ? void 0 : val.path,
            message: val === null || val === void 0 ? void 0 : val.message,
        };
    });
    const statusCode = 400;
    return {
        success: false,
        statusCode,
        message: 'Validation Error',
        errorDetails,
    };
};
exports.default = handleValidationError;
