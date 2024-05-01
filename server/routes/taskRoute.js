// taskRoute.js
import { Router } from 'express';
import verifyToken from "../middleware/auth.js";
import {
  createTask,
  updateTask,
  updateTaskStatus,
  getAllTasks,
  getTaskById,
  getCompletedTasks,
  deleteTask
} from '../controllers/taskController.js';

 const taskRouter = Router();

const routePrefix = "/tasks";

taskRouter.post(`${routePrefix}/createTask/:userId`, verifyToken, createTask);

taskRouter.put(`${routePrefix}/updateTask/:taskId`, updateTask);
taskRouter.put(`${routePrefix}/updateTaskStatus/:taskId`, updateTaskStatus);

taskRouter.get(`${routePrefix}/getAllTasks/`, verifyToken, getAllTasks);
taskRouter.get(`${routePrefix}/getTaskById/:taskId`, getTaskById);
taskRouter.get(`${routePrefix}/getCompletedTasks`, verifyToken, getCompletedTasks);

taskRouter.delete(`${routePrefix}/deleteTask/:taskId`, verifyToken, deleteTask);

export default taskRouter;