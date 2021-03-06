const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Category = new Schema({
    categoryHeading: String,
    categoryPath: String,
    subcategory: Array,
    status: {
      type: String,
      default: "active",
    }, 
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Category", Category);