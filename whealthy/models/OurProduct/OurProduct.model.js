const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const OurProduct = new Schema({
  name: String,
  url: String,
  categoryId: {
    type : mongoose.Types.ObjectId,
    ref : "Product Category"
},
  status: {
    type: String,
    default: "active",
  },
}, {
  timestamps: true,
});
module.exports = mongoose.model("OurProduct", OurProduct);