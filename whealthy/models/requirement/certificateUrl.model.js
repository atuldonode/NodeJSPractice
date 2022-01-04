const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const certificateUrl = new Schema({
  clinicFoamId: {
    type: mongoose.Types.ObjectId,
    ref: "PackageMaster",
  },
  certificateUrl: String,
  ImagesUrl: String,
  status: {
    type: String,
    default: "active",
},
}, 
{
  timestamps: true,
});
module.exports = mongoose.model("certificateUrl", certificateUrl);