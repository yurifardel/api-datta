const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/dattarest", {
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
