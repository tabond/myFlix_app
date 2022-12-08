const express = require("express"),
  morgan = require("morgan");
const app = express();
app.use(morgan("common"));

let users = [
  {
    name: "",
    age: "",
    id: "",
    userName: "",
  },
];

let movies = [
  {
    Title: "Pulp Fiction",
    Year: "1994",
    Rating: "1",
    Genre: {
      Name: "Thriller",
      blurb: "blobblobblob",
    },
    Director: {
      Name: "",
      Bio: "",
      Birth_year: "",
      Death_year: "",
    },
  },
  {
    Title: "The Lord of the Rings: The Fellowship of the Ring",
    year: "2001",
    Rating: "2",
    Genre: {
      Name: "Fantacy",
    },
  },
  {
    Title: "The Lord of the Rings: The Return of the King",
    Year: "2003",
    Rating: "3",
  },
  {
    title: "Forrest Gump",
    year: "1994",
    rating: "4",
  },
  {
    title: "Fight Club",
    year: "1999",
    rating: "5",
  },
  {
    title: "Inception",
    year: "2010",
    rating: "6",
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: "1980",
    rating: "7",
  },
  {
    title: "The Matrix",
    year: "1999",
    rating: "8",
  },
  {
    title: "Goodfellas",
    Year: "1990",
    rating: "9",
  },
  {
    title: "The lion King",
    year: "1994",
    rating: "10",
  },
];

app.get("/", (req, res) => {
  res.send("welcome to myFlix!!");
});

//Returns all movies to user
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

//return all movie data on single movie by title
app.get("/movies/:title", (req, res) => {
  const { title } = req.params,
    movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie");
  }
});
//Return data about a genre (description) by name/title (e.g., “Thriller”);
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params,
    genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("no such genre");
  }
});

//Return data about a director (bio, birth year, death year) by name;

//Allow new users to register;
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

//Allow users to update their user info (username);

//Allow users to add a movie to their list of favorites (showing only a text that a movie has been added—more on this later);

//Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed—more on this later);

//Allow existing users to deregister (showing only a text that a user email has been removed—more on this later).

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Eeeer fix it!!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
