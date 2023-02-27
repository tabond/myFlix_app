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
app.get("/movies/director/:directorName", (req, res) => {
  const { directorName } = req.params,
    director = movies.find(
      (movie) => movie.Director.Name === directorName
    ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("no such Director");
  }
});

// Allow new users to register create
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("Missing name in request body");
  }
});

// get all users

app.get("/users", (req, res) => {
  Users.find();
});

//Allow users to update their user info (username) Update
app.put("/users/:id", (req, res) => {
  const { id } = req.params,
    updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("No such user");
  }
});

// create Allow users to add a movie to their list of favorites (showing only a text that a movie has been /added—more on this later);
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favouriteMovies.push(movieTitle);
    res
      .status(200)
      .send(movieTitle + " has been added to user " + id + "s array");
  } else {
    res.status(400).send("No such user");
  }
});
//Delete (variables not pulling into text) Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed—more on this later);
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favouriteMovies = user.favouriteMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(movieTitle + " has been removed from user " + id + "s array");
  } else {
    res.status(400).send("No such user");
  }
});
//Allow existing users to deregister (showing only a text that a user email has been removed—more on this later).
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id == id);
    res.status(200).send("user " + id + " has been deleted");
  } else {
    res.status(400).send("No such user");
  }
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Eeeer fix it!!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});

// let users = [
//   {
//     name: "Tom Bond",
//     age: "",
//     favouriteMovie: [],
//     id: 1,
//   },
//   {
//     name: "Neil Smith",
//     age: "",
//     favouriteMovies: ["Pulp Fiction"],
//     id: 2,
//   },
// ];

// let movies = [
//   {
//     Title: "Pulp Fiction",
//     Year: "1994",
//     Rating: "1",
//     Genre: {
//       Name: "Thriller",
//       blurb: "blobblobblob",
//     },
//     Director: {
//       Name: "Quentin Tarantino",
//       Bio: "",
//       Birth_year: "",
//       Death_year: "",
//     },
//   },
//   {
//     Title: "The Lord of the Rings: The Fellowship of the Ring",
//     year: "2001",
//     Rating: "2",
//     Genre: {
//       Name: "Fantacy",
//     },
//   },
//   {
//     Title: "The Lord of the Rings: The Return of the King",
//     Year: "2003",
//     Rating: "3",
//   },
//   {
//     title: "Forrest Gump",
//     year: "1994",
//     rating: "4",
//   },
//   {
//     title: "Fight Club",
//     year: "1999",
//     rating: "5",
//   },
//   {
//     title: "Inception",
//     year: "2010",
//     rating: "6",
//   },
//   {
//     title: "Star Wars: Episode V - The Empire Strikes Back",
//     year: "1980",
//     rating: "7",
//   },
//   {
//     title: "The Matrix",
//     year: "1999",
//     rating: "8",
//   },
//   {
//     title: "Goodfellas",
//     Year: "1990",
//     rating: "9",
//   },
//   {
//     title: "The lion King",
//     year: "1994",
//     rating: "10",
//   },
// ];
