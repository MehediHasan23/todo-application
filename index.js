/* dependencies */
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const authRoute = require("./routers/auth");
// const todoRouter = require("./routers/todo");
const indexController = require("./controllers/indexController");
const authChecker = require("./middleware/auth/auth");
const todoRouter = require("./routers/todo");
const {
  notfoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");

/* initialize app */
const app = express();
dotenv.config();
app.set("view engine", "ejs");
app.use(express.static("public"));

/* middleware */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_PARSER));

/* routes */
/* hello from git */
/* auth route & handler */
app.use(authRoute);

/* todo router */
app.use(todoRouter);

/* todo/home router */
app.use("/", authChecker, indexController);

/* not found handler */
app.use(notfoundHandler);

/* error handler */
app.use(errorHandler);

/* database connection */
async function DB() {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
}

app.listen(process.env.PORT || 3000, () => {
  DB();
  console.log(`server is running on port: 3000`);
});
