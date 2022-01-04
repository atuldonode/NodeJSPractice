const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const QnA = new Schema( 
  {
    faqtype: {
        type: mongoose.Types.ObjectId,
        ref: 'Faq'
    },
    Que: String,
    Ans: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("QnA", QnA);