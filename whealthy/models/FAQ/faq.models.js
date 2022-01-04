const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Faq = new Schema( 
  {
    Faqtype: String,
    status: {
      type: String,
      default: "active",
    },
  },
  { 
    timestamps: true,
  }
);
module.exports = mongoose.model("Faq", Faq);