import { Router } from 'express';
import verifyToken from "../middleware/auth.js";
import {
  userLogin,
  userSignUp,
  userLogout,
  updateUser,
  getUserById
} from '../controllers/userController.js';

 const userRouter = Router();
 const routePrefix = "/users";

 userRouter.post(`/login`, userLogin);
 userRouter.post(`/signup`, userSignUp);
 userRouter.post(`/logout`, verifyToken, userLogout);
 userRouter.put(`${routePrefix}/updateUser`, verifyToken, updateUser);
 userRouter.get(`${routePrefix}/getUserById`, verifyToken, getUserById);
 userRouter.delete(`${routePrefix}/deleteUser`, verifyToken, deleteUser);

export default userRouter;