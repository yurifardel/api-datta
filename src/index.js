const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const authenticating = require("./controllers/authenticating");
const addressController = require("./controllers/auth/address");

app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authenticating);
app.use("/auth", addressController);

app.listen(8080, () => {
  console.log("express listen in port 8080");
});
