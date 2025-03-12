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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassServices = void 0;
const gymclass_model_1 = require("./gymclass.model");
//create class
const createClass = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield gymclass_model_1.ClassModel.create(payload);
});
//get class
const getClasses = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield gymclass_model_1.ClassModel.find().populate('trainer', 'name email');
});
//book a class
const bookClass = (classId, traineeId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield gymclass_model_1.ClassModel.findByIdAndUpdate(classId, {
        $push: { bookedUsers: traineeId }
    }, { new: true, runValidators: true });
    return book;
});
//cancel booking
const CancelbookClass = (classId, traineeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield gymclass_model_1.ClassModel.findByIdAndUpdate(classId, {
        $pull: { bookedUsers: traineeId }
    }, { new: true, runValidators: true });
});
//delete class
const deleteClass = (classId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield gymclass_model_1.ClassModel.findByIdAndDelete(classId);
});
exports.ClassServices = { createClass, getClasses, bookClass, CancelbookClass, deleteClass };
