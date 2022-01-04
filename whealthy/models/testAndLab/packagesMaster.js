const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const PackageMaster = new Schema({
  title: String,
  CTA: String,
  discountCTA: String,
  discountedCTA: String,
  duration: String,
  related: {
    type: String,
    enum: ["Covid", "Diabetes", "WomenHealth", "HealthyMen", "Vitamin", "HealthyBones", "Senior", "FullBody"]
  },
  details: String,
  precautions: String,
  whatIsThisTest: String,
  understandingTestResult: String,
  profileArray: Array,
  status: {
    type: String,
    default: "active",
  },
}, {
  timestamps: true,
});
module.exports = mongoose.model("PackageMaster", PackageMaster);