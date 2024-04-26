import Task from "../models/Task.js";

const createTask = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params.userId);

    // creating document using create method 
    Task.create({ userId: req.params.userId, title: req.body.title, description: req.body.description, category: req.body.category, deadline: req.body.deadline, status: req.body.status }) 
      .then(result => { 
          console.log(result) ;
          res.end(`Task ${req.body.title} created successfully for user ${req.params.userId}`);  
      });
    } catch (err) {
      res.status(500).json({ error: `taskController - createTask: ${err.message}` });

    }
}

//Update a task by its id
const updateTask = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params.taskId);

    const updatedFields = {};
    for (const key in req.body) {
      updatedFields[key] = req.body[key];
    }

    Task.findByIdAndUpdate(req.params.taskId, updatedFields)
      .then(result => {
        console.log(result) ;
        res.end(`Task ${req.body.title} updated successfully`);
      });

    } catch (err) {
      res.status(500).json({ error: `taskController - updateTask: ${err.message}` });

    }

}

// Update a task status by its id
const updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.taskId; // Get the taskId from request parameters
    const status = req.body.status; // Get the new status from request body

    const updatedStatus = await Task.findByIdAndUpdate(taskId, { status }, { new: true }).select({status: 1});

    if (!updatedStatus) {
      return res.status(400).json({ msg: `taskController - updateTaskStatus: Task not found` });
    }
  
    res.status(200).json(updatedStatus);

  } catch (err) {
    res.status(500).json({ error: `taskController - updateTaskStatus: ${err.message}` });
    
  }
};

// Get all tasks for a user
const getAllTasks = async (req, res) => {
    try {
      console.log(req.params.userId);

      const param = req.params.userId; // Get the userId from request parameters
      const tasks = await Task.find({ userId: param }); // Find tasks by userId

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
    const taskId = req.params.taskId; // Get the taskId from request parameters
    const task = await Task.findById(taskId); // Find task by taskId
    console.log(task);
    if (!task) {
      return res.status(400).json({ msg: "taskController - getTasksById: Task not found" });
    }
  
    res.status(200).json(task);

  } catch (err) {
    res.status(500).json({ error: `taskController - getTasksById: ${err.message}` });
    
  }
};

const getCompletedTasks = async (req, res) => {
  try {
    const userId = req.user.id; // Get the userId from request parameters
    const completedTasks = await Task.find({ userId, status: "completed" }); // Find tasks by userId and status

    if (!completedTasks || completedTasks.length === 0) {
      return res.status(400).json({ msg: "taskController - getCompletedTasks: No completed tasks found" });
    }
  
    res.status(200).json(completedTasks.length);

  } catch (err) {
    res.status(500).json({ error: `taskController - getCompletedTasks: ${err.message}` });
    
  }
};

// Delete a task by its id
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId; // Get the taskId from request parameters
    const task = await Task.findByIdAndDelete(taskId); // Find and delete task by taskId
    console.log(task);
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
