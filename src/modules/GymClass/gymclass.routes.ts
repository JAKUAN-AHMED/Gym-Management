import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/ValidateRequest";
import { ClassValidation } from "./gymclass.validation";
import { ClassController } from "./gymclass.controller";

const router = Router();

//Trainer : add class
router.post('/create', auth('admin'), validateRequest(ClassValidation), ClassController.createClass);


//All users : view classes
router.get('/',ClassController.getClasses);

//Trainee : book a class
router.post('/book/:classId',auth('trainee'),ClassController.bookClass);

// cancel booking
router.patch('/cancel/:classId',auth('trainee'),ClassController.CancelbookClass);

//Trainer:delete a class
router.delete('/delete/:classId',auth('admin','trainer'),ClassController.deleteClass);


export const ClassRoutes = router;