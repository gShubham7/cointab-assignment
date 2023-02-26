const express = require("express");
const {
  appendToDB,
  getUsers,
  deleteUsers,
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/", appendToDB);
router.get("/", getUsers);
router.delete("/", deleteUsers);

module.exports = router;
