const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 8081;

const readDataFile = (filename) => {
  return fs.readFileSync(path.resolve(path.dirname(require.main.filename), filename))
}

http.
  createServer((req, res) => {
    let response = "";

    switch (req.url) {
      case "/api":
        contentType = "application/json";
        response = readDataFile("election.json");
        break;
      default:
        contentType = "text/plain";
        response = "Unknown query";
    }

    res.writeHead(200, {
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": contentType
    });
    res.end(response);
  }).
  listen(port);

console.log(`Listening on http://localhost:${port}`);
console.log("Hit CTRL-C to stop the server");
