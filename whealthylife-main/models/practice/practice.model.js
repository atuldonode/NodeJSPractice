const mongoose = require("mongoose"),
  Schema = mongoose.Schema;


  const Practice = new Schema( 
    {
        clinicName : String,
        contactAlter : String,
        contactName : String,
        specialization : String,
        gstin : String,
        contact : String,
        email : String,
        designation : String,
        district : String,
        emailAlter : String,
        doctor_Id: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        website : String,
        address : String,
        locality : String,
        country : String,
        state : String,
        city : String,
        pincode : String,
        specialitie : Array,
        icon : String,
        legalName : String,
        sysMedi : String,
        typeOfClinical : String,
        status: {
        type: String,
        default: "active",
          },
    },
    {
      timestamps: true,
    }
  );


  module.exports = mongoose.model("Practice", Practice);