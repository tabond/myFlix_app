const http = require("http"),
  fs = require("fs"),
  url = require("url");
http
  .createServer((request, response) => {
    let addr = request.url,
      q = url.parse(addr, true),
      filePath = "";
    fs.appendFile(
      "log.txt",
      "URL: " + addr + "\nTimestamp: " + new Date() + "\n\n",
      (err) => {
        if (err) {
          console.log(err);
        }
        if (err) {
          console.log(err);
        } else {
          console.log("added to log.");
        }
      }
    );

    if (q.pathname.includes("documentation")) {
      filePath = _dirname + "/documentation.html";
    } else {
      filePath = "index.html";
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      }

      response.writeHead(200, { "content-type": "text/plain" });
      response, write(data);
      response.end("Hello Node!\n");
    });
  })
  .listen(8080);
console.log("My first Node test server is running on port 8080.");
