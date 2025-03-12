import { z } from "zod";

//user login
export const loginValidationSchema =  z.object({
    email: z.string({ required_error: 'email is required' }).email(),
    password: z.string({ required_error: 'password is required' }),
  });

