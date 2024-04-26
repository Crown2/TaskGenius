import mongoose from "mongoose";
mongoose.set('debug', true);

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
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
    lowercase: true,
    unique: true,
    validate: [validateEmail, "Email already exists"], 
    required: true 
  },
  createdAt: { 
    type: Date, 
    required: true 
  },
  completedTasks: { 
    type: Number,
    default: 0 
  }
});

const User = mongoose.model('User', userSchema, 'Users');

export default User;

async function validateEmail(email) {
  if (this.isModified("email")) {
    const user = await User.findOne({ email });
    if (user) {
      if (this._id.equals(user._id)) {
        return true;
      }
      return false;
    }
  }
  return true;
}