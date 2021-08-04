const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const registerMongo = require("./controllers/register-controller");

app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", registerMongo);

app.listen(8080, () => {
  console.log("express listen in port 8080");
});
