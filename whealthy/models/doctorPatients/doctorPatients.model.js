const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const doctorPatients = new Schema( 
  {
   
    patientName: String,
    doctorId: {
      type : mongoose.Types.ObjectId,
      ref : "User"
  },
    patientId:Number,
    mobile: String,
    email: String,
    category: String,
    doctorName: String,
    plannedProcedures: String,
    notes: String,
    schedule: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("doctorPatients", doctorPatients);