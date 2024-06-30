const { connectToMongoDB } = require("./connection");
const express = require("express");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");
const baseRouter = require("./routes/base");

const app = express();
const PORT = 4000;
//connection :
connectToMongoDB("mongodb://127.0.0.1:27017/project-01")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection Error : ", err);
  });

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routes :-
app.get("/", baseRouter);

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`server running on ${PORT} port`);
});
