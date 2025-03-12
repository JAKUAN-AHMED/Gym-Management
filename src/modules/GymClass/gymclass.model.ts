import { model, Schema, Types } from "mongoose";
import { IgymClass } from "./gymclass.interface";

const ClassSchema=new Schema<IgymClass>({
    name:{type:String,required:true},
    description:{type:String,required:true},
    trainer:{type:Schema.Types.ObjectId,ref:"Trainer",required:true},
    date:{type:Date},
    timeSlot:{type:String,required:true},
    bookedUsers:[{ type: Schema.Types.ObjectId, ref: 'Trainee' }]
},{
    timestamps:true
})

export const ClassModel=model<IgymClass>('Class',ClassSchema);