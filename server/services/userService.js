// services/userService.js
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import customError from '../utils/customError.js';


async function userSignup(user){

    const isValidEmail = validator.isEmail(user.email);
    if (!isValidEmail) {
        throw new customError("Invalid email.", 400);
    }

    // Validate the password
    const isValidPassword = validator.isStrongPassword(user.password, {
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 0,
        minUppercase: 1,
    });

  if (!isValidPassword) {
    throw new customError(
      "Please choose a password that has at least 1 uppercase letter, 1 number, and 1 symbol, and is at least 8 characters in length.", 400
    );
  }

  const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(user.password, salt);

    const newUser = new User({
      userName: user.userName,
      email: user.email,
      password: passwordHash,
      createdAt: new Date()
    });
    const savedUser = await newUser.save();
    savedUser.password = undefined;

    return savedUser;
};

async function userLogin(userName, password){
    const user = await User.findOne({ userName: userName });
    if (!user){
        throw new customError(`userController - loginUser: No user with the name ${userName}`, 403);
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
        throw new customError(`Invalid credentials`, 400);
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.password = undefined;

    return { token, user };
};

async function userLogout(userId){
   // return await TODO
};

async function getUserById(userId){
    const user = await User.findOne({ _id: userId });

    if (!user) {
        throw new customError(`userService - getUserById: user - ${userId} does not exist` , 401);
    }

    return user;
    
};

async function updateUser(userId, updatedFields){

    // If the email is being updated, validate new email
    if(updatedFields.email){
        const isValidEmail = validator.isEmail(user.email);
        if (!isValidEmail) {
            throw new customError("Invalid email.", 400);
        }
    }
    
    // If the password is being updated, validate old password is correct and validate new password meets requirements.
    if(updatedFields.password && updatedFields.currentPassword){
        const user = await User.findOne({ _id: userId });
        if (!user){
            throw new customError(`userController - loginUser: No user found for id: ${userId}`, 403);
        }
        
        // Verify the current password
        const isMatch = await bcrypt.compare(updatedFields.currentPassword, user.password);
        if (!isMatch){
            throw new customError(`Invalid credentials`, 400);
        }

        // Verify the new password meets requirements
        const isValidPassword = validator.isStrongPassword(updatedFields.password, {
            minLength: 8,
            minNumbers: 1,
            minSymbols: 1,
            minLowercase: 0,
            minUppercase: 1,
        });

        if (!isValidPassword) {
            throw new customError("Please choose a password that has at least 1 uppercase letter, 1 number, and 1 symbol, and is at least 8 characters in length.", 400);
        }

        // Once the old and the new passwords are verified, hash the new password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(updatedFields.password, salt); // use this value to update password;

        updatedFields.password = passwordHash;
        delete updatedFields.currentPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {new: true});

    if (!updatedUser){
        throw new customError(`userService - updateUser: user - ${userId} does not exist` , 401);
    } 

    // Remove the password from the response before sending it back to the client
    updatedUser.password = undefined;

    return updatedUser;
};

async function updateUserCompletedCount(userId, count){
    const updatedCount = await User.findByIdAndUpdate(userId, { completedTasks: count }, { new: true }).select({completedTasks: 1});

    if (!updatedCount) {
        throw new customError(`userService - updateUserCompletedCount: user - ${userId} does not exist` , 401);
    }

};

async function deleteUser(userId){
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
        throw new customError(`userService - deleteUser: user - ${userId} does not exist` , 401);
    }
};

export default { 
    userSignup,
    userLogin,
    userLogout,
    updateUser,
    updateUserCompletedCount,
    getUserById,
    deleteUser,
    
};