const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const OurProductCategory = new Schema({
  name: String,
  status: {
    type: String,
    default: "active",
  },
}, {
  timestamps: true,
});
module.exports = mongoose.model("OurProductCategory", OurProductCategory);