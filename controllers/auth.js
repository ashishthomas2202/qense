exports.signup = function (req, res) {
  const user = req.body;

  console.log(req.body);

  res.json({
    message: "Account created successfully",
  });
};

exports.signin = function (req, res) {
  res.json({
    message: "signin:get",
  });
  //   res.send("signin");
};
