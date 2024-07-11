const path = require("path");
const express = require("express");
const multer = require("multer");
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.urlencoded()); // to parse form data

app.get("/", (req, res) => {
  return res.render("homepage.ejs");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../File-Upload/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
