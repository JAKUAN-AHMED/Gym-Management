"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassValidation = void 0;
const zod_1 = require("zod");
exports.ClassValidation = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    date: zod_1.z.string().refine(date => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }),
    timeSlot: zod_1.z.string().regex(/^\d{2}:\d{2} - \d{2}:\d{2}$/, 'Time format should be HH:mm - HH:mm'),
    trainer: zod_1.z.string().min(24, 'Trainer ID must be a valid ObjectId'),
});
