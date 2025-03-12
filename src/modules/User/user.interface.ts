import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";
export type TRole = 'admin' | 'trainer'|'trainee';
export interface IUser{
  id?:Types.ObjectId,
    name:string,
    email:string,
    password:string,
    role:"admin"|"trainer"|"trainee"
}
export interface UserInterfaceModel extends Model<IUser> {
    isUserExistsByCustomEmail: (email: string) => Promise<IUser>;
    isPasswordMatch: (
      password: string,
      storedHashedPassword: string,
    ) => Promise<boolean>;
  }
  export type TuserRole = keyof typeof USER_ROLE; 