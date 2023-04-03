const mongoose = require("mongoose");
const crypto = require("crypto-js");
const { v4: uuidv4 } = require("uuid");
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timestamps: true }
);

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.virtual("fullname").get(function () {
  return this.firstName + " " + this.lastName;
});

UserSchema.methods = {
  authenticate: function (plainText) {
    let pass = this.encryptPassword(plainText).toString();
    return pass == this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) {
      return "";
    }
    try {
      return crypto.HmacSHA256(password, this.salt);
    } catch (err) {
      return { err };
    }
  },
};

module.exports = mongoose.model("User", UserSchema);
