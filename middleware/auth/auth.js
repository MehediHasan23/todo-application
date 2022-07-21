/* dependencies */
const jwt = require("jsonwebtoken");

const authChecker = async (req, res, next) => {
  try {
    if (req.signedCookies.token) {
      const token = req.signedCookies.token.split(" ")[1];
      const verifiedId = await jwt.verify(token, process.env.JWT_SECRETE);
      req.email = verifiedId.email;
      if (req.url === "/signup" || req.url === "/login") {
        return res.redirect("/");
      }
      next();
    } else {
      if (req.url === "/signup") {
        return res.render(`auth/signup`, {
          err: null,
          signErr: false,
          existErr: false,
          name: null,
          email: null,
        });
      }
      res.render(`auth/login`, {
        email: null,
        emailErr: null,
        err: null,
        passErr: null,
        validErr: false,
        msg: null,
        isSuccess: false,
      });
    }
  } catch (error) {
    if (error.message === "jwt expired") {
      if (req.url === "/signup") {
        return res.render(`auth/signup`, {
          err: null,
          signErr: false,
          existErr: false,
          name: null,
          email: null,
        });
      }
      res.render(`auth/login`, {
        email: null,
        emailErr: null,
        err: null,
        passErr: null,
        validErr: false,
        msg: null,
        isSuccess: false,
      });
      next(error);
    }
  }
};

module.exports = authChecker;
