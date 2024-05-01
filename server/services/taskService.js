// services/userService.js
import { get } from "mongoose";
import Task from "../models/Task.js";

async function createTask(task){
        return await Task.create({ userId: task.userId, title: task.title, description: task.description, category: task.category, deadline: task.deadline, status: task.status });
};

async function updateTask(taskId, updatedFields){
        return await Task.findByIdAndUpdate(taskId, updatedFields);
};

async function updateTaskStatus(taskId, newStatus){
        return await Task.findByIdAndUpdate(taskId, { status: newStatus }, { new: true }).select({ status: 1 });
};

async function getAllTasks(userId){
        return await Task.find({ userId: userId });
};

async function getTaskById(taskId){
        return await Task.findById(taskId);
};

async function getCompletedCount(userId){
        return await Task.find({userId: userId, status: "Completed"}).countDocuments();
};

async function deleteTask(taskId){
        return await Task.findByIdAndDelete(taskId);
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