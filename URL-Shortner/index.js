const { connectToMongoDB } = require("./connection");
const express = require("express");
const urlRouter = require("./routes/url");
const app = express();
const PORT = 4000;

//connection :
connectToMongoDB("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection Error : ", err);
  });

// middlewares
app.use(express.urlencoded({ extended: false }));

//Routes :-

app.get("/", (req, res) => {
  res.status(200).json({ message: "This is home Page" });
});

app.use("/url", urlRouter);

app.listen(PORT, () => {
  console.log(`server running on ${PORT} port`);
});
