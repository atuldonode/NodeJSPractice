const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const DoctorProfileComment = new Schema( 
  {
    comment: String,
    rating: Number,
    date: String,
    doctorId: {
        type : mongoose.Types.ObjectId,
        ref : "Doctor"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("DoctorProfileComment", DoctorProfileComment);