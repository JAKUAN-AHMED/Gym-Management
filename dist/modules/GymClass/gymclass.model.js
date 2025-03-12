"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassModel = void 0;
const mongoose_1 = require("mongoose");
const ClassSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    trainer: { type: mongoose_1.Schema.Types.ObjectId, ref: "Trainer", required: true },
    date: { type: Date },
    timeSlot: { type: String, required: true },
    bookedUsers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Trainee' }]
}, {
    timestamps: true
});
exports.ClassModel = (0, mongoose_1.model)('Class', ClassSchema);
