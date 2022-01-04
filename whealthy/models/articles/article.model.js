const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Article = new Schema( 
  {
   
    title: String,
    iconImg: String,
    emailImg: Array,
    discription: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Article", Article);