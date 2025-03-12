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
exports.ClassController = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utility/sendResponse"));
const gymclass_constant_1 = require("./gymclass.constant");
const gymclass_model_1 = require("./gymclass.model");
const gymclass_service_1 = require("./gymclass.service");
const createClass = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, date, timeSlot, trainer } = req.body;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // Start of the day (00:00:00)
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // End of the day (23:59:59)
    const classesToday = yield gymclass_model_1.ClassModel.countDocuments({
        date: { $gte: startOfDay, $lt: endOfDay } // Find all classes on that day
    });
    if (!(0, gymclass_constant_1.isValidTimeSlot)(timeSlot)) {
        throw new AppError_1.default(false, 400, 'Invalid time slot. Classes must be  2 hours or less');
    }
    if (classesToday >= 5) {
        throw new AppError_1.default(false, 400, 'Cannot schedule more than 5 classes per day.');
    }
    const overlappingClass = yield gymclass_model_1.ClassModel.findOne({
        trainer,
        date: { $gte: startOfDay, $lt: endOfDay },
        timeSlot
    });
    if (overlappingClass) {
        throw new AppError_1.default(false, 400, 'This trainer already has a class at this time.');
    }
    const newClass = yield gymclass_service_1.ClassServices.createClass({ name, description, trainer, date, timeSlot, bookedUsers: [] });
    try {
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'Class created successfully',
            Data: newClass,
        });
    }
    catch (err) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: err.message,
            Data: [],
        });
    }
}));
//get classes
const getClasses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let isTrue = false;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "trainer") {
        const trainerclasses = yield gymclass_model_1.ClassModel.find({ trainer: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id }).populate('"trainer', 'name email');
        isTrue = trainerclasses ? true : false;
        (0, sendResponse_1.default)(res, {
            statusCode: isTrue ? 200 : 500,
            success: isTrue,
            message: isTrue
                ? 'All classes retrieved successfully!'
                : 'failed to retrieve classes!',
            Data: isTrue ? trainerclasses : [],
        });
    }
    else {
        const allclasses = yield gymclass_model_1.ClassModel.find();
        const isTrue = allclasses ? true : false;
        (0, sendResponse_1.default)(res, {
            statusCode: isTrue ? 200 : 500,
            success: isTrue,
            message: isTrue
                ? 'All classes retrieved successfully!'
                : 'failed to retrieve classes!',
            Data: isTrue ? allclasses : [],
        });
    }
}));
//book class
const bookClass = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classId = req.params.classId;
    const traineeId = req.body.traineeId;
    //check class exist or not
    const isExistClass = yield gymclass_model_1.ClassModel.findById(classId);
    if (!isExistClass) {
        throw new AppError_1.default(false, 404, 'class not found');
    }
    // is already booked
    if (isExistClass.bookedUsers.includes(traineeId)) {
        throw new AppError_1.default(false, 400, 'Already Booked');
    }
    //check class is full or not
    if (isExistClass.bookedUsers.length >= 10) {
        throw new AppError_1.default(false, 501, 'Class is Full');
    }
    //cant book multiple book same time
    const existingBooking = yield gymclass_model_1.ClassModel.findOne({
        'bookedUsers': traineeId,
        'timeSlot': isExistClass.timeSlot,
    });
    if (existingBooking) {
        throw new AppError_1.default(false, 400, 'Trainee cannot book multiple classes in the same time slot.');
    }
    const bookedClass = yield gymclass_service_1.ClassServices.bookClass(classId, traineeId);
    const isTrue = bookedClass ? true : false;
    (0, sendResponse_1.default)(res, {
        statusCode: isTrue ? 200 : 500,
        success: isTrue,
        message: isTrue
            ? 'Booking successfully Completed!'
            : 'failed to  book!',
        Data: isTrue ? bookedClass : [],
    });
}));
const CancelbookClass = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classId = req.params.classId;
    const traineeId = req.body.traineeId;
    //check class exist or not
    const isExistClass = yield gymclass_model_1.ClassModel.findById(classId);
    if (!isExistClass) {
        throw new AppError_1.default(false, 404, 'class not found');
    }
    // is already booked
    if (!isExistClass.bookedUsers.includes(traineeId)) {
        throw new AppError_1.default(false, 400, 'Booking not found');
    }
    const bookedClass = yield gymclass_service_1.ClassServices.CancelbookClass(classId, traineeId);
    const isTrue = bookedClass ? true : false;
    (0, sendResponse_1.default)(res, {
        statusCode: isTrue ? 200 : 500,
        success: isTrue,
        message: isTrue
            ? 'cancelled Booking a class successfully!'
            : 'failed to  cancel booked class!',
        Data: isTrue ? bookedClass : [],
    });
}));
//delete class
const deleteClass = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classId = req.params.classId;
    //check class exist or not
    const isExistClass = yield gymclass_model_1.ClassModel.findById(classId);
    if (!isExistClass) {
        throw new AppError_1.default(false, 404, 'class not found');
    }
    const deletedClass = yield gymclass_service_1.ClassServices.deleteClass(classId);
    const isTrue = deletedClass ? true : false;
    (0, sendResponse_1.default)(res, {
        statusCode: isTrue ? 200 : 500,
        success: isTrue,
        message: isTrue
            ? 'Delete a class successfully!'
            : 'failed to  delete class!',
        Data: isTrue ? deleteClass : [],
    });
}));
exports.ClassController = {
    createClass,
    getClasses,
    bookClass,
    CancelbookClass,
    deleteClass
};
