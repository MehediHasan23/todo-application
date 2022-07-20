/* dependencies */

const Todo = require("../model/Todomodel");

const indexController = async (req, res) => {
  try {
    const tasks = await Todo.find({ user: req.email });
    res.render("index", { tasks });
  } catch (error) {
    throw error;
  }
};

module.exports = indexController;
