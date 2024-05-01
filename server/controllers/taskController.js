import Task from "../models/Task.js";
import taskService from "../services/taskService.js";

// Create a task for a user
const createTask = async (req, res) => {
  try {
    const task = {
      userId: req.user.id,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      deadline: req.body.deadline,
      status: req.body.status
    }

    await taskService.createTask(task).then(result => {
      console.log(result); 
      res.end(`Task ${task.title} created successfully for user ${task.userId}`);
    
    });

    } catch (err) {
      res.status(500).json({ error: `taskController - createTask: ${err.message}` });

    }
}

//Update a task by its id
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const updatedFields = {};
    let loggedFields = "";

    for (const key in req.body) {
      loggedFields += `${key}, `;
      updatedFields[key] = req.body[key];
    }

    await taskService.updateTask(taskId, updatedFields).then(result => {
      console.log(result);
      res.end(`Updated Task ${taskId} fields: ${loggedFields}successfully`);
    
    });

    } catch (err) {
      res.status(500).json({ error: `taskController - updateTask: ${err.message}` });

    }

}

// Update a task status by its id
const updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const newStatus = req.body.status; 

    await taskService.updateTaskStatus(taskId, newStatus).then(result => {
      console.log(result);

      res.end(`Task ${taskId} status updated: ${newStatus}`);
    
    });

  } catch (err) {
    res.status(500).json({ error: `taskController - updateTaskStatus: ${err.message}` });
    
  }
};

// Get all tasks for a user
const getAllTasks = async (req, res) => {
    try {
      const userId = req.user.id;
      const tasks = await taskService.getAllTasks(userId);

      if (!tasks || tasks.length === 0) {
        return res.status(400).json({ msg: "taskController - getAllTasks: This user does not have any tasks" });
      }
    
      res.status(200).json(tasks);

    } catch (err) {
      res.status(500).json({ error: `taskController - getAllTasks: ${err.message}` });
      
    }
};
// Get a single task by its id
const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.taskId; 
    const task = await taskService.getTaskById(taskId);

    if (!task) {
      return res.status(400).json({ msg: "taskController - getTasksById: Task not found" });
    }
  
    res.status(200).json(task);

  } catch (err) {
    res.status(500).json({ error: `taskController - getTasksById: ${err.message}` });
    
  }
};

// Get the number of completed tasks for a user
const getCompletedTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const completedTasks = await Task.find({userId: userId, status: "Completed"}).countDocuments();

    if (!completedTasks) {
      return res.status(400).json({ msg: "taskController - getCompletedTasks: No completed tasks found" });
    }
  
    res.status(200).json(completedTasks);

  } catch (err) {
    res.status(500).json({ error: `taskController - getCompletedTasks: ${err.message}` });
    
  }
};

// Delete a task by its id
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId; 
    const task = await taskService.deleteTask(taskId);

    if (!task) {
      return res.status(400).json({ msg: "Task not found" });
    }
  
    res.status(200).json({ msg: "taskController - deleteTasks: Task deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: `taskController - deleteTasks: ${err.message}` });
    
  }
};
  export {
      createTask,
      updateTask,
      updateTaskStatus,
      getAllTasks,
      getTaskById,
      getCompletedTasks,
      deleteTask
    };
