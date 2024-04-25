import Task from "../models/Task.js";

const getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.findById(req.query.userId);
      
      if (!tasks || tasks.length === 0) {
        return res.status(401).json({ msg: "This user does not have any tasks" });
      } 
      

      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export {
    getAllTasks
  };