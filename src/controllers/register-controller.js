const express = require("express");
const User = require("../../db/models/User");

const route = express.Router();

route.post("/register", async (req, res) => {
  try {
    const { email } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "user already exists" });
    }

    const user = User.create(req.body);

    return res.json({ user });
  } catch (err) {
    console.log(err);
  }
});

module.exports = route;
