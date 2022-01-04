const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const NotificationSent = new Schema( 
  {
    notificationSent: String,
    SlotPatientDetailsId: {
      type : mongoose.Types.ObjectId,
      ref : "SlotPatientDetails"
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
module.exports = mongoose.model("NotificationSent", NotificationSent);