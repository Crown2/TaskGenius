import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const createUser = async (req, res) => {
  try {
    console.log(req.body);

    // creating document using create method 
    User.create({ userName: req.body.userName, password: req.body.password, email: req.body.email, createdAt: new Date()}) 
      .then(result => { 
          console.log(result) ;
          res.end(`User ${req.body.userName} created successfully`);  
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}

// Used to get user id after login to grab task data.
const getUserId = async (req, res) => {
  try {
    const param = req.params.userName;
    const user = await User.findOne({ userName: param });
    
    if (!user) {
      return res.status(401).json({ msg: `userController - getUserId: No user with the name ${param}` });
    } 
    
    res.status(200).json(user._id);

  } catch (error) {
    res.status(500).json({ message: error.message });

  }
};

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({});
      
      if (!users  || users.length === 0) {
        return res.status(401).json({ msg: "userController - getAllUsers: No user data received" });
      } 
      

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const userLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName: userName });
    if (!user) return res.status(403).json({ msg: `userController - loginUser: No user with the name ${userName}` });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.password = undefined;

    res.status(200).json({ token, user });

  } catch (error) {
    res.status(500).json({ error: error.message });

  }
};

// const userLogout = async (req, res) => {
//   try {
//     // Get the count of all tasks with the status "completed" for a given userId
//     const user = await User.findById(req.user.id);

//     const user = await User.findOne({ userName: userName });
//     if (!user) return res.status(403).json({ msg: `userController - loginUser: No user with the name ${userName}` });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     user.password = undefined;

//     res.status(200).json({ token, user });

//   } catch (error) {
//     res.status(500).json({ error: error.message });

//   }
// };

// Register a new user
const userSignUp = async (req, res) => {
  const { name, email, postalCode, password, roles } = req.body;

  // Validate the email
  const isValidEmail = validator.isEmail(email);
  if (!isValidEmail) {
    return res.status(400).json({ error: "Invalid email." });
  }

  // Validate the password
  const isValidPassword = validator.isStrongPassword(password, {
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
    minLowercase: 0,
    minUppercase: 1,
  });

  if (!isValidPassword) {
    return res.status(400).json({
      error:
        "Please choose a password that has at least 1 uppercase letter, 1 number, and 1 symbol, and is at least 8 characters in length.",
    });
  }

  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: passwordHash
    });
    const savedUser = await newUser.save();
    savedUser.password = undefined;

    res.status(201).json(savedUser);

  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(400).json({ error: errors.join(", ") });
    } else if (err.code === 11000) {
      return res.status(400).json({ error: "Email is already registered." });
    } else {
      return res.status(500).json({ error: "Server Error" });
    }
  }
};

export {
    createUser,
    getUserId,
    getAllUsers,
    userLogin,
    userSignUp
  };