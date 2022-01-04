const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const  SearchLocation = new Schema( {
   
    city: String,
    
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("SearchLocation", SearchLocation);