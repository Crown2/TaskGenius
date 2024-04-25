import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
  taskId:{
    type: Number,
    required: true
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  deadline: { 
    type: Date, 
    required: true 
  },
  status: { 
    type: String, 
    default: 'Incomplete' 
  }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;