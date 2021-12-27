const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Icon = new Schema({
  packageMasterId: {
    type: mongoose.Types.ObjectId,
    ref: "PackageMaster",
  },
  testMasterId: {
    type: mongoose.Types.ObjectId,
    ref: "TestMaster",
  },
  profileMasterId: {
    type: mongoose.Types.ObjectId,
    ref: "ProfileMaster",
  },
  addProductAdminId:{
    type: mongoose.Types.ObjectId,
    ref: "addProductAdmin",
  },
  fileURL: String,
  status: {
    type: String,
    default: "active",
},
}, 
{
  timestamps: true,
});
module.exports = mongoose.model("Icon", Icon);