const express = require("express");
const User = require("../../db/models/utils/user");
const bcryptjs = require("bcryptjs");

const authJwt = require("../middleware/authJwt");

const {
  generateJwt,
  getTokenFromHeaders,
  refreshJwt,
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
    const refreshToken = refreshJwt({
      id: user.id,
      version: user.jwtVersion,
    });

    await User.findByIdAndUpdate(user.id, {
      $set: {
        token,
        refreshToken,
      },
    });

    return res.json({ user, metadata: { token, refreshToken } });
  } catch (err) {
    console.log(err);
  }
});

route.post("/login", async (req, res) => {
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
    const refreshToken = refreshJwt({
      id: user.id,
      version: user.jwtVersion,
    });
    return res.json({ user, metadata: { token, refreshToken } });
  } catch (err) {
    console.log(err);
  }
});

route.post("/refreshToken", async (req, res) => {
  const token = getTokenFromHeaders(req.headers);

  try {
    const decoded = verifyRefreshJwt(token);
    console.log(decoded.version);

    const account = await User.findById(decoded.id);

    if (!account)
      return res.status(401).send({ error: "not token in account" });

    if (decoded.version != account.jwtVersion)
      return res.status(400).send({ error: "not version" });

    const meta = {
      token: generateJwt({ id: account.id }),
    };

    await User.findByIdAndUpdate(account.id, {
      $set: {
        refreshToken: meta.token,
      },
    });

    return res.json({ meta });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "error in refresh token" });
  }
});

module.exports = route;
