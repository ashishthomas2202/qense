exports.signup = function (req, res) {
  const user = req.body;

  console.log(req.body);

  req.json({
    message: "Account created successfully",
  });
};
