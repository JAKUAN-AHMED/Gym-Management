"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTimeSlot = void 0;
const isValidTimeSlot = (timeSlot) => {
    const [start, end] = timeSlot.split(" - "); // Split the start and end times
    const startTime = new Date(`1970-01-01T${start}:00Z`); // Convert to Date object
    const endTime = new Date(`1970-01-01T${end}:00Z`);
    //  Calculate the difference in hours
    const diffInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 2; // Only return true if it's  2 hours or less 
};
exports.isValidTimeSlot = isValidTimeSlot;
