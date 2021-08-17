const express = require("express");
const User = require("../../db/models/utils/user");
const bcryptjs = require("bcryptjs");

const authJwt = require("../middleware/authJwt");

const {
  generateJwt,
  getTokenFromHeaders,
  refreshJwt,
  verifyJwt,
  verifyRefreshJwt,
} = require("../utils/helpers/jwt/jwt");

const route = express.Router();
route.use(authJwt);

route.post("/register", async (req, res) => {
  try {
    const { name, email, phone, cpf, password, confirmPassword } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "user already exists" });
    }

    if (password != confirmPassword) {
      return res.json({ error: "as passwords do not match" });
    }

    const user = await User.create({
      name,
      email,
      phone,
      cpf,
      password,
    });

    const token = generateJwt({ id: user.id });

    await User.findByIdAndUpdate(user.id, {
      $set: {
        token: token,
      },
    });

    return res.json({ user, metadata: { token } });
  } catch (err) {
    console.log(err);
  }
});

route.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.json({ error: "user not found" });
    }

    if (!(await bcryptjs.compareSync(password, user.password))) {
      return res.json({ error: "passowrd invalid" });
    }

    const token = generateJwt({ id: user.id });
    return res.json({ user, metadata: { token } });
  } catch (err) {
    console.log(err);
  }
});

module.exports = route;
