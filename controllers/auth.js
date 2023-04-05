const User = require("../models/User");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = function (req, res) {
  const user = new User(req.body);

  if (!user.firstName) {
    res.status(400).json({
      errors: {
        msg: "First Name is required.",
        param: "firstName",
      },
      message:
        "Account cannot be created at this moment. Please try again later",
    });
  }

  if (!user.lastName) {
    res.status(400).json({
      errors: {
        msg: "Last Name is required.",
        param: "lastName",
      },
      message:
        "Account cannot be created at this moment. Please try again later",
    });
  }

  if (!user.email)
    res.status(400).json({
      errors: {
        msg: "Email is required.",
        param: "email",
      },
      message:
        "Account cannot be created at this moment. Please try again later",
    });

  if (!user.password)
    res.status(400).json({
      errors: {
        msg: "Password is required.",
        param: "password",
      },
      message:
        "Account cannot be created at this moment. Please try again later",
    });

  user.firstName =
    user.firstName[0].toUpperCase() + user.firstName.substring(1).toLowerCase();
  user.lastName =
    user.lastName[0].toUpperCase() + user.lastName.substring(1).toLowerCase();

  user
    .save()
    .then((user) => {
      user.salt = undefined;
      user.hashed_password = undefined;
      res.json({ user, message: "Account created successfully" });
    })
    .catch((err) => {
      res.status(400).json({
        errors: errorHandler(err),
        message:
          "Account cannot be created at this moment. Please try again later",
      });
    });
};

exports.signin = function (req, res) {
  res.json({
    message: "signin:get",
  });
  //   res.send("signin");
};
