// taskRoute.js
import { Router } from 'express';
import {
  getAllTasks,
  createTask
} from '../controllers/taskController.js';

 const taskRouter = Router();

const taskPrefix = "/tasks";

taskRouter.get(`${taskPrefix}/getAllTasks/:userId`, getAllTasks);
taskRouter.post(`${taskPrefix}/createTask/:userId`, createTask);

export default taskRouter;