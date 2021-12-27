const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const clinicImage = new Schema({
  clinicId: {
        type: mongoose.Types.ObjectId,
        ref: 'Clinic'
    },
  additionalImage: String,
  status: {
    type: String,
    default: "active",
},
}, 
{
  timestamps: true,
});
module.exports = mongoose.model("clinicImage", clinicImage);