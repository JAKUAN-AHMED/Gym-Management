import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { ClassRoutes } from '../modules/GymClass/gymclass.routes';


const router = express.Router();

const moduleRoutes = [
  
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: '/class',
    route: ClassRoutes
  },
 

];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;