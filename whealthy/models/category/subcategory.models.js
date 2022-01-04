const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const subCategory = new Schema({
    subCategoryName: String,
    subCategoryPath: String,
    status: {
      type: String,
      default: "active",
    }, 
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("subCategory", subCategory);