const fs = require("fs");

function logReqRes(fileName) {
  return (req, res, next) => {
    const logData = `${Date.now()} : ${req.method} : ${req.path}\n`;
    fs.appendFile(fileName, logData, (err) => {});
    next();
  };
}

module.exports = {
  logReqRes,
};
