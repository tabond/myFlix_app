const mongoose = require("mongoose");
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, require: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, require: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

// creates schema db.movies and db.users in mogo DB directory
let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

//exporting the models so they can be used in index.js file
module.exports.Movie = Movie;
module.exports.User = User;
