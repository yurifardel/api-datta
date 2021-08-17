const { Router } = require("express");
const ModelAddress = require("../../../db/models/utils/address");

const route = Router();

route.post("/register-address", async (req, res) => {
  try {
    const address = await ModelAddress.create(req.body);

    return res.json({ address });
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
