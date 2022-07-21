/* dependencies */

const User = require("../model/Usermodel");
const passHash = require("../utilities/utilities");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* dependencies */

const authHandler = {};
/* signup router */
authHandler.signupRoute = (req, res) => {
  try {
    res.render(`auth/signup`, {
      err: null,
      signErr: false,
      existErr: false,
      name: null,
      email: null,
    });
  } catch (error) {
    throw error;
  }
};

/* signup handler */
authHandler.signupHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.render("auth/signup", {
        err: `Please give valid data`,
        signErr: true,
        existErr: false,
        name: null,
        email: null,
      });
    } else {
      const isExist = await User.findOne({ email });
      if (isExist) {
        return res.render("auth/signup", {
          err: `USER ALREADY EXISTS`,
          signErr: false,
          existErr: true,
          name,
          email,
        });
      } else {
        const user = new User({
          name,
          email,
          password: await passHash(password),
        });
        const result = await user.save();
        if (result) {
          res.render(`auth/login`, {
            err: null,
            email: null,
            emailErr: false,
            passErr: false,
            validErr: false,
            msg: `SIGNUP SUCCESSFULLY DONE ✅ PLEASE LOGIN`,
            isSuccess: true,
          });
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

/* login router */
authHandler.loginRoute = (req, res) => {
  try {
    res.render(`auth/login`, {
      err: null,
      email: null,
      emailErr: false,
      passErr: false,
      validErr: false,
      msg: null,
      isSuccess: false,
    });
  } catch (error) {
    throw error;
  }
};

/* login handler */
authHandler.loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      res.render("auth/login", {
        err: `Please provide valid data`,
        validErr: true,
        passErr: false,
        email: null,
        emailErr: false,
        msg: null,
        isSuccess: false,
      });
    } else {
      const user = await User.findOne({ email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = await jwt.sign(
            {
              email,
            },
            process.env.JWT_SECRETE,
            {
              expiresIn: "1hr",
            }
          );
          res.cookie("token", "Bearer " + token, {
            signed: true,
            httpOnly: true,
            secure: true,
          });
          res.redirect("/");
        } else {
          res.render("auth/login", {
            err: `wrong password!`,
            passErr: true,
            email,
            emailErr: false,
            validErr: false,
            msg: null,
            isSuccess: false,
          });
        }
      } else {
        res.render("auth/login", {
          email,
          err: `user not found`,
          emailErr: true,
          passErr: false,
          validErr: false,
          msg: null,
          isSuccess: false,
        });
      }
    }
  } catch (error) {
    throw error;
  }
};

/* logout handler */
authHandler.logoutHandler = (req, res) => {
  try {
    const result = res.clearCookie("token");
    if (result) {
      res.redirect("/login");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = authHandler;

/* const user = new User({
  name,
  email,
  password: await passHash(password),
});
const result = await user.save();
if (result) {
  res.render(`auth/login`, {
    err: null,
    email: null,
    emailErr: false,
    passErr: false,
    validErr: false,
    msg: `SIGNUP SUCCESSFULLY DONE ✅ PLEASE LOGIN`,
    isSuccess: true,
  });
} */
