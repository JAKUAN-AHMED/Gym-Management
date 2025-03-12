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
exports.AuthController = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utility/sendResponse"));
const auth_services_1 = require("./auth.services");
const bcrypt_1 = __importDefault(require("bcrypt"));
//register
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    const hashedpass = yield bcrypt_1.default.hash(password, 10);
    const result = yield auth_services_1.AuthServices.registerUser({ name, email, password: hashedpass, role });
    const isTrue = result ? true : false;
    (0, sendResponse_1.default)(res, {
        statusCode: isTrue ? 200 : 500,
        success: isTrue,
        message: isTrue
            ? 'Congratulation to the new World!'
            : 'Registration failed!',
        Data: isTrue ? result : [],
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.loginUser(req.body);
    const { accesToken, refreshToken } = result;
    //set cookie
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.node_env === 'production',
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: accesToken ? 200 : 500,
        success: true,
        message: accesToken ? 'login successful' : 'Unauthorized access',
        Data: accesToken ? { token: accesToken } : [],
    });
}));
exports.AuthController = { registerUser, loginUser };
