/* dependencies */

const Todo = require("../model/Todomodel");

/* add task handler */

const addTaskHandler = async (req, res) => {
  try {
    const { taskname, priority, date } = req.body;
    if (!taskname || !priority || !date) {
      res.redirect("/");
    } else {
      const task = new Todo({
        taskname,
        priority,
        status: "pending",
        date,
        user: req.email,
      });
      await task.save();

      return res.redirect("/");
    }
  } catch (error) {
    throw error;
  }
};

/* delete handler */
const deleteHandler = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = req.email;
    const task = await Todo.findOneAndDelete({ _id, user });
    if (task) {
      return res.redirect("/");
    }
  } catch (error) {
    throw error;
  }
};

/* change status handler */
const changeStatus = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = req.email;
    const task = await Todo.findOne({ _id, user });
    const status = task.status === "pending" ? "complete" : "pending";
    const result = await Todo.findOneAndUpdate(
      { _id, user },
      {
        $set: { status },
      }
    );
    if (result) {
      return res.redirect("/");
    }
  } catch (error) {
    throw error;
  }
};

/* edit task handler */

const editTaskHandler = async (req, res) => {
  try {
    const { taskname, priority, date } = req.body;
    const user = req.email;
    const _id = req.params.id;
    await Todo.findOneAndUpdate(
      { _id, user },
      { $set: { taskname, priority, date } }
    );
    res.redirect("/");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addTaskHandler,
  deleteHandler,
  changeStatus,
  editTaskHandler,
};
