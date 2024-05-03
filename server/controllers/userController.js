import mongoose from "mongoose";

import User from "../models/User.js";
import taskService from "../services/taskService.js";
import userService from "../services/userService.js";


// POST - Register a new user
const userSignUp = async (req, res) => {
  const user = {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  }
  console.log(user.password);
  try {
    const savedUser = await userService.createUser(user);

    res.status(201).json(savedUser);

  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(err.errors).map((error) => error.message);

      return res.status(400).json({ error: errors.join(", ") });

    } else if (err.code === 11000) {
      return res.status(400).json({ error: "Email is already registered." });

    } else {
      return res.status(error.statusCode || 500).json({ error: "Server Error", message: err.message });

    }
  }
};

// POST - Login a user
const userLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const { token, user } = await userService.userLogin(userName, password);

    res.status(200).json({ token, user });

  } catch (error) {
    res.status(500).json({ error: error.message });

  }
};

// POST - Logout a user
const userLogout = async (req, res) => {
  try {
    const userId = req.user.id;
    const completedCount = await taskService.getCompletedCount(userId);

    await userService.updateUserCompletedCount(userId, completedCount);


    res.status(200).json({ message: 'User Logout Successful!' });

  } catch (error) {
    res.status(error.statusCode || 500).json({ error: "Server Error", message: err.message });

  }
};

// PUT - Update specified user fields
const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedFields = {};
    let loggedFields = "";

    for (const key in req.body) {
      loggedFields += `${key}, `;
      updatedFields[key] = req.body[key];
    }
    console.log("updatedFields Object:", updatedFields);


    const updatedUser = await userService.updateUser(userId, updatedFields);

    res.status(200).json(updatedUser);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET - Used to get user id after login to grab task data.
const getUserById = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userService.getUserById(userId);
    
    res.status(200).json(user._id);

  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });

  }
};

// DELETE - Delete a user
const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    
    await userService.deleteUser(userId);

    res.status(200).json({ message: 'User deleted successfully!' });

  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export {
    userSignUp,
    userLogin,
    userLogout,
    updateUser,
    getUserById,
    deleteUser
  };