const express = require("express"),
  morgan = require("morgan");
const app = express();
app.use(morgan("common"));

let topTenMovies = [
  {
    title: "Pulp Fiction",
    Year: "1994",
    rating: "1",
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    Year: "2001",
    rating: "2",
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    Year: "2003",
    rating: "3",
  },
  {
    title: "Forrest Gump",
    Year: "1994",
    rating: "4",
  },
  {
    title: "Fight Club",
    Year: "1999",
    rating: "5",
  },
  {
    title: "Inception",
    Year: "2010",
    rating: "6",
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    Year: "1980",
    rating: "7",
  },
  {
    title: "The Matrix",
    Year: "1999",
    rating: "8",
  },
  {
    title: "Goodfellas",
    Year: "1990",
    rating: "9",
  },
  {
    title: "The lion King",
    Year: "1994",
    rating: "10",
  },
];

app.get("/", (req, res) => {
  res.send("welcome to myFlix");
});

app.get("/movies", (req, res) => {
  res.json(topTenMovies);
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Eeeer fix it!!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
