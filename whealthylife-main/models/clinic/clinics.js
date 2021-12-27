const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Clinic = new Schema({
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    phone: String,
    email: {
        type: String,
        // unique: true
    },
    uniqueID: {
      type: String,
      unique: true
    },
    isActivate: {
      type: String,
      enum: ["Active", "Deactive"],
      default: "Active",
    },
    icon: String,
    description: String,
    title: String,
    images: Array,
    amenities: Array,
    avatar: String,
    clinicName: String,
    clinicType: String,
    complementry: String,
    designationPerson: String,
    designation: {
        type: String,
        enum: [
          "Clinic",
        ],
        required: true,
      },
    establishmentProff: String,
    extraPhoneNumber: String,
    doctor: Array,
    fees: Number,
    healthCareService: String,
    identityFile: Array,
    isMobileVerified: {
        type: String,
        enum: ["Not", "Verified"],
        default: "Not",
        // required: true,
      },
      isEmailVerified: {
        type: String,
        enum: ["Not", "Verified"],
        default: "Not",
        // required: true,
      },
    isVerified: {
        type: String,
        // enum: ["No", "Yes", "InVerification"],
        // default: "No",
      },
    language: Array,
    legalName: String,
    mobileNumber: {
        type: String,
        // unique: true
        // required: true,
      },
    nameOfContactPerson: String,
    password: String,
    registrationNumber: String,
    registrationCouncil: String,
    registrationYear: Number,
    registrationProff: String,
    slot: Array,
    specialitie: Array,
    systemOfMedicine: String,
    timeZone: String,
    startTime : String,
    scehdule: Array,
    endTime : String,
    website: String,
    location: {
      address: String,
    landmark: String,
    locality : String,
    state: String,
    countryName: String,
    stateName: String,
    cityName: String,
    city: String,
    pincode: Number,
    country: String,
    lat: String,
    lng: String,
    facilities: Array,
    },
    locationId: {
      type: mongoose.Types.ObjectId,
      ref: "Location",
    },
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Clinic', Clinic);