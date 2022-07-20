/* dependencies */
const { Router } = require("express");
const authChecker = require("../middleware/auth/auth");
const authRoute = Router();
const {
  signupRoute,
  loginRoute,
  signupHandler,
  loginHandler,
  logoutHandler,
} = require("./../controllers/auth");

/* router & handler */
/* signup router */
authRoute.get("/signup", authChecker, signupRoute);

/* signup handler */
authRoute.post("/signup", signupHandler);

/* login router */
authRoute.get("/login", authChecker, loginRoute);

/* login handler */
authRoute.post("/login", loginHandler);

/* logout handler */
authRoute.get("/logout", authChecker, logoutHandler);

module.exports = authRoute;
