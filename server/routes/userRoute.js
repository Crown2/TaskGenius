import { Router } from 'express';
import verifyToken from "../middleware/auth.js";
import {
  userLogin,
  userSignUp,
  userLogout,
  createUser,
  getAllUsers,
  getUserId
} from '../controllers/userController.js';

 const userRouter = Router();
 const routePrefix = "/users";

 userRouter.post(`/login`, userLogin);
 userRouter.post(`/signup`, userSignUp);
 userRouter.post(`/logout`, verifyToken, userLogout);
 userRouter.post(`${routePrefix}/createUser`, createUser);
 userRouter.get(`${routePrefix}/getAllUsers`, getAllUsers);
 userRouter.get(`${routePrefix}/getUserId/:userName`, getUserId);

export default userRouter;