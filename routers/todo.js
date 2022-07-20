/* dependencies */

const { Router } = require("express");
const {
  addTaskHandler,
  deleteHandler,
  changeStatus,
  editTaskHandler,
} = require("../controllers/todo");
const authChecker = require("../middleware/auth/auth");

const todoRouter = Router();
/* add task handler */
todoRouter.post("/addtask", authChecker, addTaskHandler);

/* delete task handler */
todoRouter.get("/deletetask/:id", authChecker, deleteHandler);
/* change status handler */
todoRouter.get("/status/:id", authChecker, changeStatus);
/* edit task handler */
todoRouter.post("/edit/:id", authChecker, editTaskHandler);

module.exports = todoRouter;
