const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
