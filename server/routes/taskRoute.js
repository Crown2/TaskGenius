// taskRoute.js
import { Router } from 'express';
import {
  getAllTasks
} from '../controllers/taskController.js';

 const taskRouter = Router();

const taskPrefix = "/tasks";

 taskRouter.get(`${taskPrefix}/getAllTasks/:userId`, getAllTasks);

export default taskRouter;