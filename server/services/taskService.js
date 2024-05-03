// services/taskService.js
import Task from "../models/Task.js";

async function createTask(task){
        return await Task.create({ userId: task.userId, title: task.title, description: task.description, category: task.category, deadline: task.deadline, status: task.status });
};

async function updateTask(taskId, updatedFields){

        const task = await Task.findByIdAndUpdate(taskId, updatedFields, { new: true });
        if (!task) {
                throw new customError("Task not found", 404);
        }

        return task;
};

async function updateTaskStatus(taskId, newStatus){
        const status = await Task.findByIdAndUpdate(taskId, { status: newStatus }, { new: true }).select({ status: 1 });

        if (!task) {
                throw new customError("Task not found", 404);
        }

        return status;
};

async function getAllTasks(userId){
        const taskList =  await Task.find({ userId: userId });
        
        if (!taskList) {
                throw new customError(`No tasks found for user ${userId}`, 404);
        }

        return taskList;
};

async function getTaskById(taskId){
        const task = await Task.findById(taskId);

        if (!task) {
                throw new customError(`Task ${taskId} not found`, 404);
        }
        
        return task;
};

async function getCompletedCount(userId){
        return await Task.find({userId: userId, status: "Completed"}).countDocuments();

};

async function deleteTask(taskId){
        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
                throw new customError(`Task ${taskId} not found`, 404);
        }
};

export default { 
    createTask,
    updateTask,
    updateTaskStatus,
    getAllTasks,
    getTaskById,
    getCompletedCount,
    deleteTask
};