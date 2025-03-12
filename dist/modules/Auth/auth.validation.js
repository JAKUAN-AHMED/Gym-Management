"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidationSchema = exports.registeValidationSchema = void 0;
const zod_1 = require("zod");
//user login
exports.registeValidationSchema = zod_1.z.object({
    email: zod_1.z.string({ required_error: 'email is required' }).email(),
    password: zod_1.z.string({ required_error: 'password is required' }),
});
exports.loginValidationSchema = zod_1.z.object({
    email: zod_1.z.string({ required_error: 'email is required' }).email(),
    password: zod_1.z.string({ required_error: 'password is required' }),
});
