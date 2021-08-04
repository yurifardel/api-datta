const express = require("express");

const route = express.Router();

route.post("/register", async (req, res) => {
  const { name, email, phone, cpf } = req.body;

  res.json({
    name,
    email,
    phone,
    cpf,
  });
});

module.exports = route;
