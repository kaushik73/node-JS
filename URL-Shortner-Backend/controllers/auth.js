const User = require("../models/user");
const jwt = require("jsonwebtoken");

const jwtSecret = "kaus#124$5jai^(";

async function signup(req, res) {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
}

async function signin(req, res) {
  const { email, password } = req.body;
  console.log({ email, password }, "signin");
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", status: 400 });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret);

    // Set cookie with appropriate attributes
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Change to true if using HTTPS
      sameSite: "Lax",
    });

    res
      .status(200)
      .json({ message: "User signed in successfully", status: 200 });
    console.log({
      message: "User signed in successfully",
      status: 200,
      token: token,
    });
  } catch (error) {
    console.log(error, "erro");
    res.status(500).json({ message: "Error signing in", error });
  }
}

module.exports = { signin, signup };

module.exports = { signin, signup };
