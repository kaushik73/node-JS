const { connectToMongoDB } = require("./connection");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const urlRouter = require("./routes/url");
const homeRouter = require("./routes/home");
const authRouter = require("./routes/auth");
const verifyToken = require("./middlewares/auth");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser()); // Use cookie-parser
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true, // Allow cookies to be sent
  })
); // To enable CORS
app.use(express.json());

const PORT = 4000;
//connection :
connectToMongoDB("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection Error : ", err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes :-

app.get("/", homeRouter);
app.use("/auth", authRouter);
app.use("/url", verifyToken, urlRouter);

app.listen(PORT, () => {
  console.log(`server running on ${PORT} port`);
});
