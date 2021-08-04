const express = require("express");

const app = express();

const registerMongo = require("./controllers/register-controller");

app.use(express.json());

app.use("/auth", registerMongo);

app.listen(8080, () => {
  console.log("express listen in port 8080");
});
