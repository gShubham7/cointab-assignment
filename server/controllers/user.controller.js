const UserModel = require("../models/user.model");
const fetch = require("node-fetch");

//fetching the 100 records and storing into database...
const appendToDB = async (req, res) => {
  try {
    const response = await fetch("https://randomuser.me/api?&results=100");
    const data = await response.json();
    const apppendUsers = await UserModel.insertMany(data.results);
    res.send({ message: "Success", users: data });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//get users with pagination...
const getUsers = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    let skip = (page - 1) * limit;

    const totalPages = Math.ceil((await UserModel.find().count()) / limit);
    if (page > totalPages) {
      return res.status(400).send({ message: "Page limit exceeded" });
    }
    const users = await UserModel.find().skip(skip).limit(limit);
    return res.status(200).send({ users, totalPages });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//delete all users from database...
const deleteUsers = async (req, res) => {
  try {
    const removedUsers = await UserModel.deleteMany();
    return res.status(200).send({ message: "Success" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { appendToDB, getUsers, deleteUsers };
