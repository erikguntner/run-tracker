const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcyrpt = require("bcrypt-nodejs");

// Define out model
const userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  password: String
});

//On save hook, encrypt password
// Run before saving a a model to the datbase
userSchema.pre("save", function(next) {
  const user = this;

  bcyrpt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcyrpt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);

      // overwrite plain text password with encrpyted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcyrpt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);

    callback(null, isMatch);
  });
};

// Create the model class
const ModelClass = mongoose.model("user", userSchema);

// Export the model
module.exports = ModelClass;
