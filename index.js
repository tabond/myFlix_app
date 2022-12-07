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

// const http = require("http"),
//   fs = require("fs"),
//   url = require("url"),
  const express = require('express'),
  morgan = require ('morgan');
  const app = express();

  let topTenMovies = [
    {
        title: 'Pulp Fiction',
        Year: '1994',
        rating: '1'
    },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        Year: '2001',
        rating: '2'
    },
    {
        title: 'The Lord of the Rings: The Return of the King',
        Year: '2003',
        rating: '3'
    },
    {
        title: 'Forrest Gump',
        Year: '1994',
        rating: '4'
    },
    {
        title: 'Fight Club',
        Year: '1999',
        rating: '5'
    },
    {
        title: 'Inception',
        Year: '2010',
        rating: '6'
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        Year: '1980',
        rating: '7'
    },
    {
        title: 'The Matrix',
        Year: '1999',
        rating: '8'
    },{
        title: 'Goodfellas',
        Year: '1990',
        rating: '9'
    },{
        title: 'The lion King',
        Year: '1994',
        rating: '10'
    }
  ];
app.use(morgan('common'));

app.get('/',(req, res)=> {
    res.send('welcome to myFlix');
});

app.get('/movies',(req, res) => {
res.json();
})


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

      app.get('/', (req, res) => {
  res.send('Welcome to my book club!');
});
  })
  .listen(8080);
console.log("My first Node test server is running on port 8080.");
