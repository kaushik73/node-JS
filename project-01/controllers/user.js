const User = require("../models/user");

const handleGetAllUsers = async (req, res) => {
  // add X - good practice for custom headers
  res.setHeader("X-developed-by", "Kaushik Jain");
  const allUsers = await User.find({});
  console.log(allUsers);
  return res.status(200).json(allUsers);
};

const handleCreateNewUser = async (req, res) => {
  const userData = req.body;
  if (!userData || !userData.first_name || !userData.email) {
    return res.status(400).json({ msg: "name , email is requred" });
  }

  const result = await User.create({
    firstName: userData.first_name,
    lastName: userData.last_name,
    gender: userData.gender,
    email: userData.email,
    jobTitle: userData.job_title,
  });
  console.log("result", result);
  return res.status(201).json({
    status: "sucess",
    message: `user inserted with id ${result._id}`,
  });
};

const handleGetUserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }
  return res.json(user);
};

const handleUpdateUserById = async (req, res) => {
  const id = req.params.id;
  let updatedUserData = req.body;

  console.log(updatedUserData, "updatedUserData");
  try {
    const user = await User.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({
      status: "success",
      message: `User updated with id ${id}`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An error occurred while updating the user",
    });
  }
};

const handleDeleteUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User with id ${id} not found`,
      });
    }
    return res.status(200).json({
      status: "success",
      message: `User deleted with id ${id}`,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An error occurred while deleting the user",
    });
  }
};

module.exports = {
  handleGetAllUsers,
  handleCreateNewUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
};
