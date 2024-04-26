import mongoose from "mongoose";
mongoose.set('debug', true);

const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
  userId: { 
    type: String, 
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
}, {collection : 'Tasks'});

const Task = mongoose.model('Task', taskSchema, 'Tasks');

export default Task;