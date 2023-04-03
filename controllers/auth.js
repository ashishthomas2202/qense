const User = require("../models/user");

exports.signup = function (req, res) {
  //   console.log(req);

  const user = new User(req.body);

  let firstName = user.firstName;
  user.firstName =
    firstName[0].toUpperCase() + firstName.substring(1).toLowerCase();

  let lastName = user.lastName;
  user.lastName =
    lastName[0].toUpperCase() + lastName.substring(1).toLowerCase();

  //   let email? = user.email;
  console.log(req.body);

  console.log(user);

  user
    .save()
    .then((user) => {
      user.salt = undefined;
      user.hashed_password = undefined;

      res.json({
        user,
        message: "Account Successfully Created.",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Unable to signup a this moment.",
        errors: err,
      });
    });
};

exports.signin = function (req, res) {
  res.json({
    message: "signin:get",
  });
  //   res.send("signin");
};
