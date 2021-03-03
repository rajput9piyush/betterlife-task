const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  largepicture: {
    type: String,
    sparse: true
  },
  thumbnail: {
    type: String,
    sparse: true
  },
  fullname: {
    type: String,
    sparse: true
  },
  gender: {
    type: String,
    sparse: true
  },
  nat: {
    type: String,
    sparse: true
  },
  email: {
    type: String,
    sparse: true
  },
  phone: {
    type: String,
    sparse: true
  },
});

userSchema.virtual("name").set(function (name) {
  this.fullname = name.title + " " + name.first + " " + name.last;
});

userSchema.virtual("picture").set(function (picture) {
  this.largepicture = picture.large;
  this.thumbnail = picture.thumbnail;
});

module.exports = mongoose.model("User", userSchema);
