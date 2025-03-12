import { Types } from "mongoose";

export interface IgymClass{
    name:string,
    description:string,
    trainer:Types.ObjectId,
    date:Date,
    timeSlot:string, //10:00-12:00
    bookedUsers:Types.ObjectId[]
}