const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  tel: {
    required: true,
    type: Number,
  },
  email: {
    required: true,
    type: String,
  },
  details: {
    required: true,
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Customers", customerSchema);
