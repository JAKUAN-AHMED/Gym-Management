"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const ValidateRequest_1 = __importDefault(require("../../middlewares/ValidateRequest"));
const gymclass_validation_1 = require("./gymclass.validation");
const gymclass_controller_1 = require("./gymclass.controller");
const router = (0, express_1.Router)();
//Trainer : add class
router.post('/create', (0, auth_1.default)('admin'), (0, ValidateRequest_1.default)(gymclass_validation_1.ClassValidation), gymclass_controller_1.ClassController.createClass);
//All users : view classes
router.get('/', gymclass_controller_1.ClassController.getClasses);
//Trainee : book a class
router.post('/book/:classId', (0, auth_1.default)('trainee'), gymclass_controller_1.ClassController.bookClass);
// cancel booking
router.patch('/cancel/:classId', (0, auth_1.default)('trainee'), gymclass_controller_1.ClassController.CancelbookClass);
//Trainer:delete a class
router.delete('/delete/:classId', (0, auth_1.default)('admin', 'trainer'), gymclass_controller_1.ClassController.deleteClass);
exports.ClassRoutes = router;
