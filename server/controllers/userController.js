import User from "../models/User.js"; 

const getAllUsers = async (req, res) => {
    try {
      const users = await User.findById(req.user.id);
      
      if (!users || users.length === 0) {
        return res.status(401).json({ msg: "This user does not have any users" });
      } 
      

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export {
    getAllUsers
  };