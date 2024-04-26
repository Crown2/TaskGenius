import Task from "../models/Task.js";

const getAllTasks = async (req, res) => {
    try {
      console.log(req.params.userId);
      const param = +req.params.userId; // Get the userId from request parameters
      const tasks = await Task.find({ userId: param }); // Find tasks by userId
      console.log(tasks);
      if (!tasks || tasks.length === 0) {
        return res.status(400).json({ msg: "This user does not have any tasks" });
      }
    
      res.status(200).json(tasks);

    } catch (err) {
      res.status(500).json({ error: err.message });
      
    }
};

const createTask = async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.params.userId);

      // creating document using create method 
      Task.create({ taskId: req.body.taskId, userId: req.params.userId, title: req.body.title, description: req.body.description, category: req.body.category, deadline: req.body.deadline, status: req.body.status }) 
        .then(result => { 
            console.log(result) ;
            res.end(`Task ${req.body.taskId} created successfully for user ${req.params.userId}`);  
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

  export {
      getAllTasks,
      createTask
    };
