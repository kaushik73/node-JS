const http = require("http");
const fs = require("fs");
const url = require("url");

function myHandler(req, res) {
  if (req.url == "/favicon.ico") {
    return res.end();
  }

  const parsedURL = url.parse(req.url, true);

  const logData = `Request made on ${parsedURL.pathname}, request Type : ${
    req.method
  } , with param name : ${
    parsedURL.query.name
  } at ${new Date().toUTCString()}\n`;

  fs.appendFile("log.txt", logData, (err, data) => {
    switch (parsedURL.pathname) {
      case "/":
        res.end("Home Page");
        break;
      // pass the name parameter on contact route
      case "/contact":
        const name = parsedURL.query.name;
        res.end(`Hi ${name}, Contact Us Page`);
        break;
      // either get/put request
      case "/signup":
        if (req.method == "GET") {
          res.end("THis is a signup form");
        } else if (req.method == "PUT") {
          res.end("sucessfully saved your data");
        }
        break;
      default:
        res.end("Error 404 page");
    }
  });
}
const myServer = http.createServer(myHandler);

myServer.listen(2000, () => {
  console.log("Server listning on port 2000");
});
