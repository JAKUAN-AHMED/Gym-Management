import { z } from "zod";

export const ClassValidation=z.object({
    name:z.string(),
    description:z.string(),
    date: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
      }),
      timeSlot: z.string().regex(/^\d{2}:\d{2} - \d{2}:\d{2}$/, 'Time format should be HH:mm - HH:mm'),
      trainer: z.string().min(24, 'Trainer ID must be a valid ObjectId'),
})