const jwt = require("jsonwebtoken");

const jwtSecret = "kaus#124$5jai^("; // Replace with your secret key

function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided", status: 401 });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Failed to authenticate token", status: 401 });
    }
    console.log(req.user, "before decode");
    req.user = decoded; // You can use this to get user information from the token
    console.log(req.user, "after decode");
    next();
  });
}

module.exports = verifyToken;
