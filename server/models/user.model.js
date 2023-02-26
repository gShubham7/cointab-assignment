const { Schema, model } = require("mongoose");

const nameSchema = new Schema({
  title: String,
  first: String,
  last: String,
});

const locationSchema = new Schema({
  street: {
    number: Number,
    name: String,
  },
  city: String,
  state: String,
  country: String,
  postcode: String,
  coordinates: {
    latitude: String,
    longitude: String,
  },
  timezone: { offset: String, description: String },
});

const loginSchema = new Schema({
  uuid: String,
  username: String,
  password: String,
  salt: String,
  md5: String,
  sha1: String,
  sha256: String,
});

const dobSchema = new Schema({
  date: String,
  age: Number,
});

const registeredSchema = new Schema({
  date: String,
  age: Number,
});

const pictureSchema = new Schema({
  large: String,
  medium: String,
  thumbnail: String,
});

const UserSchema = new Schema(
  {
    name: nameSchema,
    gender: String,
    dob: String,
    email: String,
    location: locationSchema,
    login: loginSchema,
    dob: dobSchema,
    registered: registeredSchema,
    phone: String,
    cell: String,
    picture: pictureSchema,
    nat: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// User Model
const UserModel = model("user", UserSchema);

module.exports = UserModel;
