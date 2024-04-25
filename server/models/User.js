import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  userName: { 
    type: String,
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  createdDate: { 
    type: String, 
    required: true 
  },
  completedTasks: { 
    type: Number,
    default: 0 
  }
});

const User = mongoose.model('User', userSchema);

export default User;