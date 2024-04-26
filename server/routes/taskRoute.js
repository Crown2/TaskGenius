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

taskRouter.post(`${routePrefix}/createTask/:userId`, createTask);

taskRouter.put(`${routePrefix}/updateTask/:taskId`, updateTask);
taskRouter.put(`${routePrefix}/updateTaskStatus/:taskId`, updateTaskStatus);

taskRouter.get(`${routePrefix}/getAllTasks/:userId`, getAllTasks);
taskRouter.get(`${routePrefix}/getTaskById/:taskId`, getTaskById);
taskRouter.get(`${routePrefix}/getCompletedTasks`, verifyToken, getTaskById);

taskRouter.delete(`${routePrefix}/deleteTask/:taskId`, deleteTask);

export default taskRouter;