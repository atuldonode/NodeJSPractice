const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const mainCategory = new Schema({
categoryName: String,
categoryPath: String,
  subCat: Array,
    status: {
      type: String,
      default: "active",
    }, 
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("mainCategory", mainCategory);