"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    node_env: process.env.NODE_ENV || 'development',
    access_token_secret: process.env.JWT_ACCESS_TOKEN,
    access_token_expires: process.env.JWT_TOKEN_EXPIRES,
    refress_token_secret: process.env.JWT_REFRESH_TOKEN,
    refresh_token_expires: process.env.JWT_REFRESH_TOKEN_EXPIRES
};
