/* dependencies */

const Todo = require("../model/Todomodel");
const User = require("../model/Usermodel");

const indexController = async (req, res) => {
  try {
    const tasks = await Todo.find({ user: req.email });
    const user = await User.findOne({ email: req.email });

    res.render("index", { tasks, name: user.name });
  } catch (error) {
    throw error;
  }
};

module.exports = indexController;
