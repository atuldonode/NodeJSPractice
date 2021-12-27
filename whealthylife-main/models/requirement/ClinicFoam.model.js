const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const  ClinicFoam = new Schema( {
   
 Bank: {
        account: String,
        confAccount: String,
        accHolder: String,
        Ifsc: String,
        branch: String,
        address: String
    },
 otherBank: {
        account: String,
        confAccount: String,
        accHolder: String,
        Ifsc: String,
        branch: String,
        address: String
    },
ISOcertif: String,
Insta: String,
address: String,
amenities: Array,
businessName: String,
businessType: String,
category: Array,
city: String,
clinicCertif: Array,
clinicClose: String,
clinicOpen: String,
clinicNumber: String,
customerSuppemail: String,
customerSuppnumber: Array,
designation: String,
email: String,
endTime: String,
fb: String,
gstNumber: String,
laboratory: String,
latitude: String,
longitude: String,
mobile: String,
name: String,
officeMob: String,
other: String,
otherFacilities: Array,
patientworking: String,
pincode: String,
pinterest: String,
registeredBranch: String,
siteUrl: String,
startTime: String,
state: String,
std: String,
suppEndtime: String,
suppStarttime: String,
weekDays: Array,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("ClinicFoam", ClinicFoam);