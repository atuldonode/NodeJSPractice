const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const SlotPatientDetails = new Schema( 
  {
    appointmentfor: String,
    email: String,
    fullname: String,
    mobile: String,
    payment: String,
    date: String,
    monthOfBooking: Number,
    modeOfTreatment: String,
    slotTime: String,
    doctorId: {
      type : mongoose.Types.ObjectId,
      ref : "User"
  },
  clinicId: {
    type: mongoose.Types.ObjectId,
    ref: 'Clinic'
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
module.exports = mongoose.model("SlotPatientDetails", SlotPatientDetails);