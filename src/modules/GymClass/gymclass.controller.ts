import AppError from "../../errors/AppError";
import catchAsync from "../../utility/catchAsync"
import sendResponse from "../../utility/sendResponse";
import { isValidTimeSlot } from "./gymclass.constant";
import { ClassModel } from "./gymclass.model";
import { ClassServices } from "./gymclass.service";

const createClass = catchAsync(async (req, res) => {
    const { name, description, date,timeSlot,trainer } = req.body;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // Start of the day (00:00:00)
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // End of the day (23:59:59)
    
    const classesToday = await ClassModel.countDocuments({
      date: { $gte: startOfDay, $lt: endOfDay }  // Find all classes on that day
    });

    if(!isValidTimeSlot(timeSlot)){
      throw new AppError(false, 400, 'Invalid time slot. Classes must be  2 hours or less');
    }
    if (classesToday >= 5) {
      throw new AppError(false, 400, 'Cannot schedule more than 5 classes per day.');
    }
    const overlappingClass = await ClassModel.findOne({
      trainer,
      date: { $gte: startOfDay, $lt: endOfDay },
      timeSlot 
  });

  if (overlappingClass) {
      throw new AppError(false, 400, 'This trainer already has a class at this time.');
  }
    const newClass = await ClassServices.createClass({ name, description, trainer, date, timeSlot,bookedUsers:[]})
    try {
        sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'Class created successfully',
          Data: newClass,
        });
      } catch (err: any) {
        sendResponse(res, {
          statusCode: 400,
          success: false,
          message: err.message,
          Data: [],
        });
      }
})


//get classes

const getClasses=catchAsync(async(req,res)=>{
  let isTrue=false;
  if(req.user?.role==="trainer")
  {
    const trainerclasses=await ClassModel.find({trainer:req.user?.id}).populate('"trainer','name email');
   isTrue= trainerclasses ? true : false;

   sendResponse(res, {
    statusCode: isTrue ? 200 : 500,
    success: isTrue,
    message: isTrue
      ? 'All classes retrieved successfully!'
      : 'failed to retrieve classes!',
    Data: isTrue ? trainerclasses : [],
  });
  }
 else
  {
    const allclasses=await ClassModel.find();
  const isTrue: boolean = allclasses ? true : false;
  sendResponse(res, {
    statusCode: isTrue ? 200 : 500,
    success: isTrue,
    message: isTrue
      ? 'All classes retrieved successfully!'
      : 'failed to retrieve classes!',
    Data: isTrue ? allclasses : [],
  });
     
  }
  
  
    
})


//book class
const bookClass=catchAsync(async(req,res)=>{
  const classId=req.params.classId;
  const traineeId=req.body.traineeId ;

  //check class exist or not
  const isExistClass=await ClassModel.findById(classId);
  if(!isExistClass){
    throw new AppError(false,404,'class not found');
  }

  // is already booked
  if(isExistClass.bookedUsers.includes(traineeId)){
    throw new AppError(false,400,'Already Booked');
  }

  //check class is full or not
  if(isExistClass.bookedUsers.length>=10)
  {
    throw new AppError(false,501,'Class is Full');
  }

  //cant book multiple book same time
  const existingBooking = await ClassModel.findOne({
    'bookedUsers': traineeId,
    'timeSlot': isExistClass.timeSlot,
});
if (existingBooking) {
    throw new AppError(false, 400, 'Trainee cannot book multiple classes in the same time slot.');
}


  const bookedClass=await ClassServices.bookClass(classId,traineeId);
  
  const isTrue: boolean = bookedClass ? true : false;
  
  sendResponse(res, {
    statusCode: isTrue ? 200 : 500,
    success: isTrue,
    message: isTrue
      ? 'Booking successfully Completed!'
      : 'failed to  book!',
    Data: isTrue ? bookedClass : [],
  });
  
  
  

})
const CancelbookClass=catchAsync(async(req,res)=>{
  const classId=req.params.classId;
  const traineeId=req.body.traineeId;

  //check class exist or not
  const isExistClass=await ClassModel.findById(classId);
  if(!isExistClass){
    throw new AppError(false,404,'class not found');
  }

  // is already booked
  if(!isExistClass.bookedUsers.includes(traineeId)){
    throw new AppError(false,400,'Booking not found');
  }


  const bookedClass=await ClassServices.CancelbookClass(classId,traineeId);
  const isTrue: boolean = bookedClass ? true : false;
  
  sendResponse(res, {
    statusCode: isTrue ? 200 : 500,
    success: isTrue,
    message: isTrue
      ? 'cancelled Booking a class successfully!'
      : 'failed to  cancel booked class!',
    Data: isTrue ? bookedClass : [],
  });
  
  
  

})

//delete class
const deleteClass=catchAsync(async(req,res)=>{
  const classId=req.params.classId;
  //check class exist or not
  const isExistClass=await ClassModel.findById(classId);
  if(!isExistClass){
    throw new AppError(false,404,'class not found');
  }
  const deletedClass=await ClassServices.deleteClass(classId);
  const isTrue: boolean = deletedClass ? true : false;
  
  sendResponse(res, {
    statusCode: isTrue ? 200 : 500,
    success: isTrue,
    message: isTrue
      ? 'Delete a class successfully!'
      : 'failed to  delete class!',
    Data: isTrue ? deleteClass : [],
  });
})

export const ClassController = {
createClass,
getClasses,
bookClass,
CancelbookClass,
deleteClass
}