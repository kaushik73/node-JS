const URL = require("../models/url");
console.log("handleHomePage");

async function handleHomePage(req, res) {
  return res.render("../views/home.ejs");
}

module.exports = {
  handleHomePage,
};
