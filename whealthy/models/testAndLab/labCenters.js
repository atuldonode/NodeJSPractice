const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const LabCenter = new Schema(
  {
    labId: {
      type: mongoose.Types.ObjectId,
      ref: "Lab",
    },
    icon: String,
    name: String,
    email: String,
    fax: String,
    cityName: String,
    mobileNumber: Array,
    type: {
      type: String,
    },
    details: String,
    address: String,
    landmark: String,
    countryName: String,
    stateName: String,
    cityName: String,
    state: String,
    city: String,
    pincode: Number,
    country: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("LabCenter", LabCenter);
