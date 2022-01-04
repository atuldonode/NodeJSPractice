const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const consultTopDoctor = new Schema({
  title: String,
  url: String,
  status: {
    type: String,
    default: "active",
  },
}, {
  timestamps: true,
});
module.exports = mongoose.model("consultTopDoctor", consultTopDoctor);