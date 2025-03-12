"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const errorDetails = [
        {
            field: err.path,
            message: err.message,
        },
    ];
    const statusCode = 400;
    return {
        success: false,
        statusCode,
        message: 'Invalid Id',
        errorDetails,
    };
};
exports.default = handleCastError;
