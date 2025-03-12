import { IgymClass } from "./gymclass.interface"
import { ClassModel } from "./gymclass.model"


//create class
const createClass=async(payload:IgymClass)=>{
    return await ClassModel.create(payload);
}

//get class
const getClasses=async()=>{
    return await ClassModel.find().populate('trainer','name email');
}

//book a class
const bookClass=async(classId:string,traineeId:string)=>{
    
    const book=await ClassModel.findByIdAndUpdate(classId,{
        $push:{bookedUsers:traineeId}
    },{new:true,runValidators:true});
   return book;
}


//cancel booking
const CancelbookClass=async(classId:string,traineeId:string)=>{
    return await ClassModel.findByIdAndUpdate(classId,{
        $pull:{bookedUsers:traineeId}
    },{new:true,runValidators:true});
   
}

//delete class
const deleteClass=async(classId:string)=>{
    return await ClassModel.findByIdAndDelete(classId);
}
export const ClassServices={createClass,getClasses,bookClass,CancelbookClass,deleteClass};