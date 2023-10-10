const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

//require mongoose and models.js
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");

//model names for inport
const Movies = Models.Movie;
const Users = Models.User;
//const Genres = Models.Genre;
//const Directors = Models.Director;

//db name is test - allowinf mongoose to performe crud on database
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//log req to server
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors
const cors = require("cors");
//constrict acceptance to certain origins
let allowedOrigins = ["http://localhost:8080", "http://testsite.com"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn’t found on the list of allowed origins
        let message =
          "The CORS policy for this application doesn’t allow access from origin" +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

// require passport
let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");

// intial text
app.get("/", (req, res) => {
  res.send("welcome to myFlix!!");
});

//Returns all movies to user
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find()
      .then((movies) => {
        res.json(movies);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

//return all movie data on single movie by title
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        res.status(201).json(movie);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);
//Return data about a genre (description) by name/title (e.g., “Thriller”);
app.get(
  "/genre/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.Name })
      .then((movie) => {
        res.status(201).json(movie.Genre);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

//get info on director when looking up director
app.get(
  "/director/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Name })
      .then((movie) => {
        res.status(201).json(movie.Director);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

//mongoose style
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + " already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// get all users

app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("error:" + err);
      });
  }
);

// get a user by username
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Add a movie to a user's list of favorites
app.post(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { FavoriteMovies: req.params.MovieID },
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Delete a user by username
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Delete (variables not pulling into text) Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed—more on this later);
app.delete(
  "/users/:id/:movieTitle",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);
//Allow existing users to deregister (showing only a text that a user email has been removed—more on this later).
app.delete(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.params;

    let user = users.find((user) => user.id == id);

    if (user) {
      users = users.filter((user) => user.id == id);
      res.status(200).send("user " + id + " has been deleted");
    } else {
      res.status(400).send("No such user");
    }
  }
);

//access doc using express static
app.use(express.static("public"));

//error handlin
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Eeeer fix it!!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
