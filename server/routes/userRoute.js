import { Router } from 'express';
import {
  getAllUsers
} from '../controllers/userController.js';

 const userRouter = Router();

 userRouter.get('/getAllUsers', getAllUsers);

export default userRouter;