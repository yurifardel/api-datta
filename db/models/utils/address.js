const mongoose = require("../../mongoose");

const AddressSchema = new mongoose.Schema({
  road: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
