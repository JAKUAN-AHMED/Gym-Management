import { TRole } from "./user.interface";

export const USER_ROLE = {
    admin:'admin',
    trainer:'trainer',
    trainee:'trainee'
  } as const;
  export const Role: TRole[] = ['admin', 'trainer','trainee'];