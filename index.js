// Follow the instructions to require express in your “index.js” file.

// Using the Express routing syntax discussed earlier in the Exercise, create an Express GET route located at the endpoint “/movies” that returns a JSON object containing data about your top 10 movies.

// Create another GET route located at the endpoint “/” that returns a default textual response of your choosing.
//- Test this by running your project from the terminal and navigating to your URL endpoints in a browser. Make sure the correct data response is displayed.

// Use express.static to serve your “documentation.html” file from the public folder (rather than using the http, url, and fs modules).
//- If you run your project from the terminal, you should be able to navigate to “localhost:[portnumber]/documentation.html”. Test that the correct file loads in your browser.

// Use the Morgan middleware library to log all requests (instead of using the fs module to write to a text file).
// -Try navigating to a few pages in your browser and test that the correct information is logged to the terminal.

// Create an error-handling middleware function that will log all application-level errors to the terminal.

// Submit a link to your GitHub repo showing your modified “index.js” file with all of the above steps implemented.

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
