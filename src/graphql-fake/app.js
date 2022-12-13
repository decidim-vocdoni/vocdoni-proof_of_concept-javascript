const http = require("http");
const fs = require("fs");
const path = require("path");
const index = fs.readFileSync(path.resolve(path.dirname(require.main.filename), "election.json"));
const port = 8081;

http.
  createServer((_req, res) => {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(index);
  }).
  listen(port);

console.log(`Listening on http://localhost:${port}`);
console.log("Hit CTRL-C to stop the server");
