const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const PatientDetails = new Schema( 
  {
    name: String,
    mobile: String,
    gender: String,
    email: String,
    age: String,
    patientAddress: {
      houseAddress: String,
      label: String,
      landmark: String,
      locality: String,
      mobile: String,
      pincode: String
    },
    patientId: {
      type : mongoose.Types.ObjectId,
      ref : "User"
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
module.exports = mongoose.model("PatientDetails", PatientDetails);