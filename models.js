const mongoose = require("mongoose");
<<<<<<< HEAD
const bcrypt = require("bcrypt");
=======
const bcrypt = require('bcrypt');
>>>>>>> dac90cc4133feda611a80165234e8d7b2ac99019
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
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
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

<<<<<<< HEAD
=======
//for hashing of passwords
>>>>>>> dac90cc4133feda611a80165234e8d7b2ac99019
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

<<<<<<< HEAD
userSchema.methods.validatePassword = function (password) {
=======
userSchema.methods.validatePassword = function(password) {
>>>>>>> dac90cc4133feda611a80165234e8d7b2ac99019
  return bcrypt.compareSync(password, this.Password);
};

// creates schema db.movies and db.users in mogo DB directory
let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

//exporting the models so they can be used in index.js file
module.exports.Movie = Movie;
module.exports.User = User;
